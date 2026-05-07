import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Card variant matching the React Card component.
enum CkCardVariant { standard, interactive, outlined }

/// Card padding.
enum CkCardPadding { none, sm, md, lg }

/// A card container matching the web @cookest/ui Card.
class CkCard extends StatefulWidget {
  const CkCard({
    super.key,
    required this.child,
    this.variant = CkCardVariant.standard,
    this.padding = CkCardPadding.md,
    this.onTap,
  });

  final Widget child;
  final CkCardVariant variant;
  final CkCardPadding padding;
  final VoidCallback? onTap;

  @override
  State<CkCard> createState() => _CkCardState();
}

class _CkCardState extends State<CkCard> {
  bool _hovered = false;

  double get _paddingValue {
    switch (widget.padding) {
      case CkCardPadding.none:
        return 0;
      case CkCardPadding.sm:
        return 12;
      case CkCardPadding.md:
        return 20;
      case CkCardPadding.lg:
        return 28;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    final isInteractive = widget.variant == CkCardVariant.interactive;

    return MouseRegion(
      onEnter: isInteractive ? (_) => setState(() => _hovered = true) : null,
      onExit: isInteractive ? (_) => setState(() => _hovered = false) : null,
      cursor: isInteractive ? SystemMouseCursors.click : SystemMouseCursors.basic,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
          transform: Matrix4.identity()
            ..translate(0.0, isInteractive && _hovered ? -2.0 : 0.0),
          padding: EdgeInsets.all(_paddingValue),
          decoration: BoxDecoration(
            color: widget.variant == CkCardVariant.outlined
                ? Colors.transparent
                : surfaceColor,
            borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
            border: Border.all(color: borderColor),
            boxShadow: widget.variant != CkCardVariant.outlined
                ? [
                    BoxShadow(
                      color: CookestTokens.colorBlack.withAlpha(
                        isInteractive && _hovered ? 26 : 13,
                      ),
                      blurRadius: isInteractive && _hovered ? 25 : 2,
                      offset: Offset(0, isInteractive && _hovered ? 10 : 1),
                    ),
                  ]
                : null,
          ),
          child: widget.child,
        ),
      ),
    );
  }
}

/// Card header with bottom border — matches React CardHeader.
class CkCardHeader extends StatelessWidget {
  const CkCardHeader({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: borderColor)),
      ),
      child: DefaultTextStyle(
        style: GoogleFonts.inter(
          fontSize: CookestTokens.fontSizeSm,
          fontWeight: CookestTokens.fontWeightSemibold,
          color: headingColor,
        ),
        child: child,
      ),
    );
  }
}

/// Card body — matches React CardBody.
class CkCardBody extends StatelessWidget {
  const CkCardBody({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark
        ? CookestTokens.colorTextDark
        : CookestTokens.colorTextLight;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: DefaultTextStyle(
        style: GoogleFonts.inter(
          fontSize: CookestTokens.fontSizeSm,
          color: textColor,
        ),
        child: child,
      ),
    );
  }
}

/// Card footer with top border — matches React CardFooter.
class CkCardFooter extends StatelessWidget {
  const CkCardFooter({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: borderColor)),
      ),
      child: child,
    );
  }
}
