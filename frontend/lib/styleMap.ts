





const bgMap: Record<string, string> = {
  dark: "bg-black",
  light: "bg-white",
  primary: "bg-purple-600",
  secondary: "bg-fuchsia-700",
  gradient:
    "bg-gradient-to-br from-[#151019] via-[#0b0b0b] to-violet-950/30",
  transparent: "bg-transparent",
};

export function bgClass(value?: string | null): string {
  return bgMap[value ?? ""] ?? "";
}





const textMap: Record<string, string> = {
  light: "text-white",
  dark: "text-black",
  white: "text-white",
  black: "text-black",
  primary: "text-purple-400",
  secondary: "text-fuchsia-300",
};

export function textClass(value?: string | null): string {
  return textMap[value ?? ""] ?? "";
}





const alignMap: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function alignClass(value?: string | null): string {
  return alignMap[value ?? ""] ?? "";
}





const sizeMap: Record<string, string> = {
  small: "min-h-[320px] py-12",
  medium: "min-h-[480px] py-20",
  large: "min-h-[640px] py-28",
};

export function sizeClass(value?: string | null): string {
  return sizeMap[value ?? ""] ?? "py-20";
}





const colMap: Record<string, string> = {
  col2: "grid-cols-1 sm:grid-cols-2",
  col3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  col4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  col5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

export function colClass(value?: string | null): string {
  return colMap[value ?? ""] ?? colMap.col4;
}





const btnVariantMap: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105",
  secondary:
    "bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:scale-105",
  outline:
    "border-2 border-white/30 text-white hover:border-white hover:bg-white/5 hover:scale-105",
};

export function btnVariantClass(value?: string | null): string {
  return btnVariantMap[value ?? ""] ?? btnVariantMap.primary;
}





const btnSizeMap: Record<string, string> = {
  small: "px-5 py-2.5 text-sm",
  medium: "px-7 py-3.5 text-base",
  large: "px-10 py-4 text-lg",
};

export function btnSizeClass(value?: string | null): string {
  return btnSizeMap[value ?? ""] ?? btnSizeMap.medium;
}
