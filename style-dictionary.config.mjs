import StyleDictionary from "style-dictionary";

// Custom Dart format: generates a Dart class with static constants
StyleDictionary.registerFormat({
  name: "dart/class",
  format: ({ dictionary, file }) => {
    const className = file.options?.className || "CookestTokens";
    const lines = [
      "// GENERATED FILE — DO NOT EDIT",
      "// Source: tokens/*.json → style-dictionary build",
      "// Run `bun run tokens:build` to regenerate.",
      "",
      "import 'package:flutter/material.dart';",
      "",
      `class ${className} {`,
      `  ${className}._();`,
      "",
    ];

    for (const token of dictionary.allTokens) {
      const comment = token.description ? `  /// ${token.description}` : "";

      if (token.type === "color" && typeof token.value === "string") {
        const hex = token.value;
        if (hex.startsWith("rgba")) {
          const match = hex.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
          if (match) {
            const [, r, g, b, a] = match;
            const alpha = Math.round(parseFloat(a) * 255).toString(16).padStart(2, "0");
            const rr = parseInt(r).toString(16).padStart(2, "0");
            const gg = parseInt(g).toString(16).padStart(2, "0");
            const bb = parseInt(b).toString(16).padStart(2, "0");
            const colorHex = `0x${alpha}${rr}${gg}${bb}`.toUpperCase();
            if (comment) lines.push(comment);
            lines.push(`  static const Color ${tokenName(token.path)} = Color(${colorHex});`);
          }
        } else if (hex.startsWith("#")) {
          const clean = hex.replace("#", "");
          const dartHex = clean.length === 6 ? `0xFF${clean.toUpperCase()}` : `0x${clean.toUpperCase()}`;
          if (comment) lines.push(comment);
          lines.push(`  static const Color ${tokenName(token.path)} = Color(${dartHex});`);
        }
      } else if (token.type === "dimension" || token.type === "duration") {
        // Strip any CSS units — Dart values are raw doubles (pixels)
        const numVal = typeof token.value === "string"
          ? parseFloat(token.value.replace(/[a-z%]+$/i, ""))
          : token.value;
        if (comment) lines.push(comment);
        lines.push(`  static const double ${tokenName(token.path)} = ${numVal};`);
      } else if (token.type === "fontWeight") {
        const rawVal = typeof token.value === "string"
          ? parseInt(token.value, 10)
          : token.value;
        const fw = fontWeightMap[rawVal] || `FontWeight.w${rawVal}`;
        if (comment) lines.push(comment);
        lines.push(`  static const FontWeight ${tokenName(token.path)} = ${fw};`);
      } else if (token.type === "fontFamily") {
        if (comment) lines.push(comment);
        lines.push(`  static const String ${tokenName(token.path)} = '${token.value}';`);
      } else if (token.type === "shadow") {
        if (comment) lines.push(comment);
        lines.push(`  static const String ${tokenName(token.path)} = '${token.value}';`);
      } else if (token.type === "other") {
        if (comment) lines.push(comment);
        lines.push(`  static const int ${tokenName(token.path)} = ${token.value};`);
      }
    }

    lines.push("}");
    lines.push("");
    return lines.filter((l) => l !== undefined).join("\n");
  },
});

// Custom CSS variables format for light/dark modes
StyleDictionary.registerFormat({
  name: "css/cookest-variables",
  format: ({ dictionary }) => {
    const lightVars = [];
    const darkVars = [];
    const themeVars = [];

    for (const token of dictionary.allTokens) {
      if (token.type !== "color") continue;
      const path = token.path;

      // Primary DEFAULT → --ck-primary in :root
      if (path[0] === "color" && path[1] === "primary" && path[2] === "DEFAULT") {
        lightVars.unshift(`  --ck-primary: ${token.value};`);
      }
      // Primary light/dark for CSS variables
      if (path[0] === "color" && path[1] === "primary" && path[2] === "light") {
        lightVars.push(`  --ck-primary-light: ${token.value};`);
      }
      if (path[0] === "color" && path[1] === "primary" && path[2] === "dark") {
        lightVars.push(`  --ck-primary-dark: ${token.value};`);
      }
      // Primary palette for @theme
      if (path[0] === "color" && path[1] === "primary" && ["DEFAULT", "light", "dark"].includes(path[2])) {
        const suffix = path[2] === "DEFAULT" ? "" : `-${path[2]}`;
        themeVars.push(`  --color-ck-primary${suffix}: ${token.value};`);
      }
      // Dual-mode semantic tokens (background, card, heading, text, etc.)
      const dualTokens = ["background", "card", "heading", "text", "muted", "border", "surface", "surfaceMuted"];
      if (path[0] === "color" && dualTokens.includes(path[1])) {
        // Map to the CSS var names used by components
        const nameMap = {
          background: "bg",
          card: "bg-card",
          heading: "heading",
          text: "text",
          muted: "text-muted",
          border: "border",
          surface: "surface",
          surfaceMuted: "surface-muted",
        };
        const varName = `--ck-${nameMap[path[1]]}`;
        if (path[2] === "light") {
          lightVars.push(`  ${varName}: ${token.value};`);
        } else if (path[2] === "dark") {
          darkVars.push(`  ${varName}: ${token.value};`);
        }
      }
      // Status colors (same in both modes)
      if (path[0] === "color" && path[1] === "status") {
        lightVars.push(`  --ck-${path[2]}: ${token.value};`);
      }
    }

    return [
      '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap");',
      '@import "tailwindcss";',
      "",
      "@theme {",
      ...themeVars,
      "}",
      "",
      ":root {",
      ...lightVars,
      "}",
      "",
      ".dark {",
      ...darkVars,
      "}",
      "",
    ].join("\n");
  },
});

const fontWeightMap = {
  300: "FontWeight.w300",
  400: "FontWeight.w400",
  500: "FontWeight.w500",
  600: "FontWeight.w600",
  700: "FontWeight.w700",
};

function tokenName(path) {
  // Convert path like ["color", "primary", "DEFAULT"] → "colorPrimaryDefault"
  return path
    .map((p, i) => {
      // Clean numeric-like segments
      const clean = p.replace(/-/g, "_").replace(/^(\d)/, "n$1");
      if (i === 0) return clean.toLowerCase();
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .join("");
}

const config = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "tokens/build/",
      files: [
        {
          destination: "styles.generated.css",
          format: "css/cookest-variables",
        },
      ],
    },
    dart: {
      transforms: [],
      buildPath: "tokens/build/",
      files: [
        {
          destination: "cookest_tokens.dart",
          format: "dart/class",
          options: {
            className: "CookestTokens",
          },
        },
      ],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
console.log("✅ Style Dictionary build complete");
