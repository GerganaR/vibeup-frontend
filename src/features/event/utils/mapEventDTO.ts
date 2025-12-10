import type { EventDTO, EventModel } from "../types";

export const mapEventDTO = (dto: EventDTO): EventModel => ({
  ...dto,
  startDateTime: new Date(dto.startDateTime),
  endDateTime: new Date(dto.endDateTime),
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});
