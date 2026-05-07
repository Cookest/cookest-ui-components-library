import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Input size.
enum CkInputSize { sm, md, lg }

/// A text input matching the web @cookest/ui Input.
class CkInput extends StatelessWidget {
  const CkInput({
    super.key,
    this.controller,
    this.label,
    this.helperText,
    this.error,
    this.placeholder,
    this.iconLeft,
    this.iconRight,
    this.inputSize = CkInputSize.md,
    this.fullWidth = true,
    this.obscureText = false,
    this.enabled = true,
    this.keyboardType,
    this.onChanged,
    this.onSubmitted,
  });

  final TextEditingController? controller;
  final String? label;
  final String? helperText;
  final String? error;
  final String? placeholder;
  final Widget? iconLeft;
  final Widget? iconRight;
  final CkInputSize inputSize;
  final bool fullWidth;
  final bool obscureText;
  final bool enabled;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;

  double get _fontSize {
    switch (inputSize) {
      case CkInputSize.sm:
        return CookestTokens.fontSizeSm;
      case CkInputSize.md:
        return CookestTokens.fontSizeSm;
      case CkInputSize.lg:
        return CookestTokens.fontSizeBase;
    }
  }

  EdgeInsets get _contentPadding {
    switch (inputSize) {
      case CkInputSize.sm:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 6);
      case CkInputSize.md:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 10);
      case CkInputSize.lg:
        return const EdgeInsets.symmetric(horizontal: 20, vertical: 14);
    }
  }

  double get _borderRadius {
    switch (inputSize) {
      case CkInputSize.sm:
        return CookestTokens.radiusLg;
      case CkInputSize.md:
      case CkInputSize.lg:
        return CookestTokens.radiusXl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;

    final hasError = error != null && error!.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(
              label!,
              style: GoogleFonts.inter(
                fontSize: inputSize == CkInputSize.lg
                    ? CookestTokens.fontSizeBase
                    : CookestTokens.fontSizeSm,
                fontWeight: CookestTokens.fontWeightMedium,
                color: headingColor,
              ),
            ),
          ),
        TextField(
          controller: controller,
          obscureText: obscureText,
          enabled: enabled,
          keyboardType: keyboardType,
          onChanged: onChanged,
          onSubmitted: onSubmitted,
          style: GoogleFonts.inter(
            fontSize: _fontSize,
            color: headingColor,
          ),
          decoration: InputDecoration(
            hintText: placeholder,
            hintStyle: GoogleFonts.inter(
              fontSize: _fontSize,
              color: mutedColor,
            ),
            prefixIcon: iconLeft,
            suffixIcon: iconRight,
            filled: true,
            fillColor: surfaceColor,
            contentPadding: _contentPadding,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(_borderRadius),
              borderSide: BorderSide(color: borderColor),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(_borderRadius),
              borderSide: BorderSide(
                color: hasError
                    ? CookestTokens.colorStatusError
                    : borderColor,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(_borderRadius),
              borderSide: BorderSide(
                color: hasError
                    ? CookestTokens.colorStatusError
                    : CookestTokens.colorPrimaryDEFAULT,
                width: 2,
              ),
            ),
            errorText: null, // We render error below manually
          ),
        ),
        if (hasError)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              error!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeXs,
                color: CookestTokens.colorStatusError,
              ),
            ),
          ),
        if (!hasError && helperText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              helperText!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeXs,
                color: mutedColor,
              ),
            ),
          ),
      ],
    );
  }
}
