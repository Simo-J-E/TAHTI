export const STYLE_MODE_OPTIONS = [
  { value: "tahti", labelKey: "sections.styling.styleMode.options.tahti" },
  { value: "wilma", labelKey: "sections.styling.styleMode.options.wilma" },
  { value: "futuristic", labelKey: "sections.styling.styleMode.options.futuristic" },
  { value: "oldschool", labelKey: "sections.styling.styleMode.options.oldschool" },
  { value: "cartoon", labelKey: "sections.styling.styleMode.options.cartoon" },
  { value: "animated", labelKey: "sections.styling.styleMode.options.animated" },
  { value: "focus", labelKey: "sections.styling.styleMode.options.focus" },
] as const;

export type StyleModeId = (typeof STYLE_MODE_OPTIONS)[number]["value"];

export const isStyleModeId = (value: string): value is StyleModeId =>
  STYLE_MODE_OPTIONS.some((option) => option.value === value);
