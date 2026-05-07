import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Button variant matching the React `Button` component.
enum CkButtonVariant { primary, secondary, ghost, danger }

/// Button size.
enum CkButtonSize { sm, md, lg }

/// A button component matching the web @cookest/ui Button.
///
/// Supports [variant], [size], [loading] state, leading/trailing icons,
/// and [fullWidth] stretching.
class CkButton extends StatefulWidget {
  const CkButton({
    super.key,
    required this.child,
    this.onPressed,
    this.variant = CkButtonVariant.primary,
    this.size = CkButtonSize.md,
    this.loading = false,
    this.iconLeft,
    this.iconRight,
    this.fullWidth = false,
  });

  final Widget child;
  final VoidCallback? onPressed;
  final CkButtonVariant variant;
  final CkButtonSize size;
  final bool loading;
  final Widget? iconLeft;
  final Widget? iconRight;
  final bool fullWidth;

  @override
  State<CkButton> createState() => _CkButtonState();
}

class _CkButtonState extends State<CkButton> {
  bool _pressed = false;

  bool get _disabled => widget.onPressed == null || widget.loading;

  EdgeInsets get _padding {
    switch (widget.size) {
      case CkButtonSize.sm:
        return const EdgeInsets.symmetric(horizontal: 12, vertical: 6);
      case CkButtonSize.md:
        return const EdgeInsets.symmetric(horizontal: 20, vertical: 10);
      case CkButtonSize.lg:
        return const EdgeInsets.symmetric(horizontal: 28, vertical: 14);
    }
  }

  double get _fontSize {
    switch (widget.size) {
      case CkButtonSize.sm:
      case CkButtonSize.md:
        return CookestTokens.fontSizeSm;
      case CkButtonSize.lg:
        return CookestTokens.fontSizeBase;
    }
  }

  double get _radius {
    switch (widget.size) {
      case CkButtonSize.sm:
        return CookestTokens.radiusLg;
      case CkButtonSize.md:
      case CkButtonSize.lg:
        return CookestTokens.radiusXl;
    }
  }

  double get _gap {
    switch (widget.size) {
      case CkButtonSize.sm:
        return 6;
      case CkButtonSize.md:
        return 8;
      case CkButtonSize.lg:
        return 10;
    }
  }

  Color get _backgroundColor {
    switch (widget.variant) {
      case CkButtonVariant.primary:
        return CookestTokens.colorPrimaryDEFAULT;
      case CkButtonVariant.secondary:
        return Colors.transparent;
      case CkButtonVariant.ghost:
        return Colors.transparent;
      case CkButtonVariant.danger:
        return CookestTokens.colorStatusError;
    }
  }

  Color get _foregroundColor {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    switch (widget.variant) {
      case CkButtonVariant.primary:
      case CkButtonVariant.danger:
        return CookestTokens.colorWhite;
      case CkButtonVariant.secondary:
      case CkButtonVariant.ghost:
        return isDark
            ? CookestTokens.colorHeadingDark
            : CookestTokens.colorHeadingLight;
    }
  }

  BoxDecoration get _decoration {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return BoxDecoration(
      color: _backgroundColor.withAlpha(_disabled ? 128 : 255),
      borderRadius: BorderRadius.circular(_radius),
      border: widget.variant == CkButtonVariant.secondary
          ? Border.all(color: borderColor)
          : null,
      boxShadow: !_disabled && widget.variant == CkButtonVariant.primary
          ? [
              BoxShadow(
                color: CookestTokens.colorPrimaryDEFAULT.withAlpha(89),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ]
          : null,
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _disabled ? null : (_) => setState(() => _pressed = true),
      onTapUp: _disabled ? null : (_) => setState(() => _pressed = false),
      onTapCancel: _disabled ? null : () => setState(() => _pressed = false),
      onTap: _disabled ? null : widget.onPressed,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOut,
        transform: Matrix4.identity()
          ..scale(_pressed ? 0.98 : 1.0)
          ..translate(0.0, _pressed ? 0.0 : (_disabled ? 0.0 : -0.5)),
        decoration: _decoration,
        width: widget.fullWidth ? double.infinity : null,
        padding: _padding,
        child: Row(
          mainAxisSize: widget.fullWidth ? MainAxisSize.max : MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (widget.loading)
              Padding(
                padding: EdgeInsets.only(right: _gap),
                child: SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: _foregroundColor,
                  ),
                ),
              ),
            if (!widget.loading && widget.iconLeft != null)
              Padding(
                padding: EdgeInsets.only(right: _gap),
                child: widget.iconLeft!,
              ),
            Opacity(
              opacity: widget.loading ? 0.7 : 1.0,
              child: DefaultTextStyle(
                style: GoogleFonts.inter(
                  fontSize: _fontSize,
                  fontWeight: CookestTokens.fontWeightSemibold,
                  color: _foregroundColor,
                ),
                child: widget.child,
              ),
            ),
            if (!widget.loading && widget.iconRight != null)
              Padding(
                padding: EdgeInsets.only(left: _gap),
                child: widget.iconRight!,
              ),
          ],
        ),
      ),
    );
  }
}
