import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTranslation, type Language } from "@/store/i18nSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import enTranslations from "@/i18n/locales/en.json";
import bgTranslations from "@/i18n/locales/bg.json";

interface TranslationItem {
  key: string;
  source: string;
  target: string;
}

export function TranslationEditor() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const customTranslations = useAppSelector(
    (state) => state.i18n.customTranslations
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [targetLang, setTargetLang] = useState<Language>("bg");

  // Merge base translations with custom overrides from Redux
  const getMergedTranslations = (lang: Language) => {
    const base = lang === "bg" ? bgTranslations : enTranslations;
    const custom = customTranslations[lang] || {};
    return { ...base, ...custom };
  };

  const bgData = getMergedTranslations("bg");
  const enData = getMergedTranslations("en");

  // Get current target data based on tab selection
  const currentTargetData = targetLang === "bg" ? bgData : enData;

  const tableData: TranslationItem[] = useMemo(() => {
    // English is always the source for keys
    return Object.entries(enTranslations).map(([key, source]) => ({
      key,
      source: source as string,
      target: currentTargetData[key as keyof typeof currentTargetData] || "",
    }));
  }, [currentTargetData]);

  // Filter based on search
  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData;
    const lowerQuery = searchQuery.toLowerCase();
    return tableData.filter(
      (item) =>
        item.key.toLowerCase().includes(lowerQuery) ||
        item.source.toLowerCase().includes(lowerQuery) ||
        item.target.toLowerCase().includes(lowerQuery)
    );
  }, [tableData, searchQuery]);

  const handleTranslationChange = (key: string, value: string) => {
    dispatch(updateTranslation({ lang: targetLang, key, value }));
  };

  return (
    <Card className="h-full w-full border border-slate-200 shadow-sm flex flex-col rounded-none p-0">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none border-b border-slate-200 pt-1 p-3 shrink-0 bg-white"
      >
        <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
          <div className="flex flex-col">
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold tracking-tight"
            >
              {t("Translation Editor")}
            </Typography>
            <Typography variant="small" className="font-medium text-slate-500">
              {t("Choose a language to edit its translations from the switcher besides.")}
            </Typography>
          </div>

          <div className="w-full xl:w-auto flex flex-col md:flex-row gap-3 md:items-center  p-1.5 rounded-xl border border-slate-100">
            {/* Target Language Switcher */}
            <div className="w-full md:w-auto">
              <LanguageSwitch
                selectedLanguage={targetLang}
                onLanguageChange={(lang) => setTargetLang(lang)}
              />
            </div>

            <div className="h-8 w-px bg-slate-200 hidden md:block mx-1"></div>

            {/* Search */}
            {/* Search - Custom Premium Input Style */}
            <div className="w-full md:w-64 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 text-sm bg-white border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 hover:border-slate-300 shadow-sm"
                placeholder={t("Search keys...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block items-center h-5 border border-slate-200 rounded px-1.5 font-sans text-[10px] font-medium text-slate-400 bg-slate-50">
                  /
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Table Container - handles overflow */}
      <CardBody className="flex-1 overflow-hidden px-0 py-0 min-h-0">
        <div className="h-full overflow-y-auto w-full">
          <table className="w-full table-fixed text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-blue-50">
              <tr className="border-b border-slate-200">
                <th className="p-4 border-r border-slate-100 w-[40%]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {t("Source Text")}
                  </Typography>
                </th>
                <th className="p-4 w-[60%]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {t("Translation")} ({targetLang.toUpperCase()})
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(({ key, source, target }, index) => {
                const isLast = index === filteredData.length - 1;
                const classes = isLast
                  ? "p-3"
                  : "p-3 border-b border-slate-100";
                const isMissing = !target;

                return (
                  <tr
                    key={key}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {/* Source Column: Text wrapping enabled */}
                    <td
                      className={`${classes} border-r border-slate-100 bg-slate-50/30 align-top`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-sm break-words whitespace-normal"
                      >
                        {source}
                      </Typography>
                    </td>

                    {/* Target Column: Editable Area */}
                    <td className={classes}>
                      <div className="relative">
                        <textarea
                          className={`
                            w-full min-h-[42px] p-2.5 text-sm rounded-lg
                            border transition-all duration-200
                            resize-y focus:outline-none focus:ring-2
                            ${
                              isMissing
                                ? "border-orange-200 bg-orange-50 focus:border-orange-500 focus:ring-orange-500/20 placeholder:text-orange-400"
                                : "border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-blue-500/10"
                            }
                          `}
                          placeholder={t("Enter translation...")}
                          value={target}
                          onChange={(e) =>
                            handleTranslationChange(key, e.target.value)
                          }
                          rows={source.length > 60 ? 3 : 1}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-slate-500">
                    <Typography>
                      {t("No translations found matching your search.")}
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
