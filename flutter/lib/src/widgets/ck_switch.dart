import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Switch size matching the React Switch component.
enum CkSwitchSize { sm, md, lg }

/// A switch component matching the web @cookest/ui Switch.
class CkSwitch extends StatelessWidget {
  const CkSwitch({
    super.key,
    required this.value,
    required this.onChanged,
    this.label,
    this.description,
    this.size = CkSwitchSize.md,
    this.enabled = true,
  });

  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final String? description;
  final CkSwitchSize size;
  final bool enabled;

  Size get _trackSize {
    switch (size) {
      case CkSwitchSize.sm:
        return const Size(36, 20);
      case CkSwitchSize.md:
        return const Size(44, 24);
      case CkSwitchSize.lg:
        return const Size(52, 28);
    }
  }

  double get _thumbSize {
    switch (size) {
      case CkSwitchSize.sm:
        return 14;
      case CkSwitchSize.md:
        return 18;
      case CkSwitchSize.lg:
        return 22;
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

    final trackColor =
        value ? CookestTokens.colorPrimaryDEFAULT : borderColor;
    final travel = _trackSize.width - _thumbSize - 6; // 3px padding each side

    return GestureDetector(
      onTap: enabled ? () => onChanged?.call(!value) : null,
      child: Opacity(
        opacity: enabled ? 1.0 : 0.5,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: _trackSize.width,
              height: _trackSize.height,
              child: Stack(
                alignment: Alignment.centerLeft,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    curve: Curves.easeOut,
                    decoration: BoxDecoration(
                      color: trackColor,
                      borderRadius: BorderRadius.circular(
                        _trackSize.height / 2,
                      ),
                    ),
                  ),
                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 200),
                    curve: Curves.easeOut,
                    left: value ? travel + 3 : 3,
                    child: Container(
                      width: _thumbSize,
                      height: _thumbSize,
                      decoration: BoxDecoration(
                        color: CookestTokens.colorWhite,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: CookestTokens.colorBlack.withAlpha(13),
                            blurRadius: 2,
                            offset: const Offset(0, 1),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            if (label != null || description != null)
              Padding(
                padding: const EdgeInsets.only(left: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (label != null)
                      Text(
                        label!,
                        style: GoogleFonts.inter(
                          fontSize: CookestTokens.fontSizeSm,
                          fontWeight: CookestTokens.fontWeightMedium,
                          color: headingColor,
                        ),
                      ),
                    if (description != null)
                      Text(
                        description!,
                        style: GoogleFonts.inter(
                          fontSize: CookestTokens.fontSizeXs,
                          color: mutedColor,
                        ),
                      ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
