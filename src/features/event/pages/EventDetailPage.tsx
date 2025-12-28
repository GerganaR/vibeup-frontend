import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useGetEvent } from "../hooks/useGetEvent";
import { useRsvp } from "../hooks/useRSVP";
import { useCancelRsvp } from "../hooks/useCancelRsvp";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useUpdateEvent } from "../hooks/useUpdateEvent";
import { useAppSelector } from "@/store/hooks";
import { EventDetailHero } from "../components/EventDetailHero";
import { EventDetailInfo } from "../components/EventDetailInfo";
import { EventRSVPCard } from "../components/EventRSVPCard";
import { AttendeesList } from "../components/AttendeesList";
import { EventFormModal } from "../components/EventFormModal";
import { EventLocationMap } from "../components/EventLocationMap";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { CreateEventDTO } from "../types";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { getEvent, event, loading } = useGetEvent();
  const { rsvp, loading: rsvpLoading } = useRsvp();
  const { cancelRsvp, loading: cancelLoading } = useCancelRsvp();
  const { deleteEvent, loading: deleteLoading } = useDeleteEvent();
  const { updateEvent, loading: updateLoading } = useUpdateEvent();

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id]);

  const handleBack = () => {
    navigate("/events");
  };

  const handleRSVP = async () => {
    if (!id) return;
    try {
      await rsvp(id);
      // Refresh event data
      getEvent(id);
    } catch (error) {
      console.error("RSVP failed:", error);
    }
  };

  const handleCancelRSVP = async () => {
    if (!id) return;
    try {
      await cancelRsvp(id);
      // Refresh event data
      getEvent(id);
    } catch (error) {
      console.error("Cancel RSVP failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteEvent(id);
      navigate("/events");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdate = async (data: CreateEventDTO) => {
    if (!id) return;
    try {
      await updateEvent(id, data);
      setShowEditModal(false);
      // Refresh event data
      getEvent(id);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-gray-500 text-lg mb-4">Event not found</p>
        <Button color="green" onClick={handleBack}>
          Back to Events
        </Button>
      </div>
    );
  }

  const isHost = user?.id === event.hostId;
  const currentUserId = user?.id;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back Button */}
      <Button
        variant="text"
        className="flex items-center gap-2 text-sm sm:text-base"
        onClick={handleBack}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Events
      </Button>

      {/* Hero Section */}
      <Card className="shadow-lg overflow-hidden">
        <EventDetailHero
          title={event.title}
          description={event.description}
          categories={event.categories}
          coverCategory={event.categories?.[0]}
          latitude={event.latitude}
          longitude={event.longitude}
          address={event.address}
          endDateTime={event.endDateTime}
        />
      </Card>

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Event Info */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="shadow-md">
            <CardBody className="p-4 sm:p-6">
              <EventDetailInfo event={event} />
            </CardBody>
          </Card>

          {/* Location Map */}
          {event.latitude && event.longitude && (
            <EventLocationMap
              latitude={event.latitude}
              longitude={event.longitude}
              address={event.address}
              height={400}
            />
          )}

          {/* Attendees */}
          <Card className="shadow-md">
            <CardBody className="p-4 sm:p-6">
              <AttendeesList
                attendeeIds={event.attendees || []}
                cohostIds={event.cohosts || []}
              />
            </CardBody>
          </Card>
        </div>

        {/* Right Column: RSVP Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4 sm:space-y-6">
            <EventRSVPCard
              event={event}
              currentUserId={currentUserId}
              isHost={isHost}
              onRSVP={handleRSVP}
              onCancelRSVP={handleCancelRSVP}
              loading={rsvpLoading || cancelLoading}
            />

            {/* Host Actions */}
            {isHost && (
              <Card className="shadow-lg">
                <CardBody className="space-y-3 p-4 sm:p-6">
                  <Button
                    variant="outlined"
                    color="blue"
                    fullWidth
                    className="flex items-center justify-center gap-2"
                    onClick={() => setShowEditModal(true)}
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit Event
                  </Button>
                  <Button
                    variant="outlined"
                    color="red"
                    fullWidth
                    className="flex items-center justify-center gap-2"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete Event
                  </Button>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EventFormModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
          initialData={event}
          loading={updateLoading}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        loading={deleteLoading}
      />
    </div>
  );
}
