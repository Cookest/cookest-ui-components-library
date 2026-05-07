import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Alert variant matching the React Alert component.
enum CkAlertVariant { info, success, warning, error }

/// An alert component matching the web @cookest/ui Alert.
class CkAlert extends StatelessWidget {
  const CkAlert({
    super.key,
    required this.child,
    this.variant = CkAlertVariant.info,
    this.title,
    this.dismissible = false,
    this.onDismiss,
    this.icon,
  });

  final Widget child;
  final CkAlertVariant variant;
  final String? title;
  final bool dismissible;
  final VoidCallback? onDismiss;
  final Widget? icon;

  Color _backgroundColor(bool isDark) {
    switch (variant) {
      case CkAlertVariant.info:
        return isDark ? const Color(0x332563EB) : const Color(0xFFEFF6FF);
      case CkAlertVariant.success:
        return isDark ? const Color(0x33059669) : const Color(0xFFECFDF5);
      case CkAlertVariant.warning:
        return isDark ? const Color(0x33D97706) : const Color(0xFFFFFBEB);
      case CkAlertVariant.error:
        return isDark ? const Color(0x33DC2626) : const Color(0xFFFEF2F2);
    }
  }

  Color _foregroundColor(bool isDark) {
    switch (variant) {
      case CkAlertVariant.info:
        return isDark ? const Color(0xFFBFDBFE) : const Color(0xFF1E40AF);
      case CkAlertVariant.success:
        return isDark ? const Color(0xFFA7F3D0) : const Color(0xFF065F46);
      case CkAlertVariant.warning:
        return isDark ? const Color(0xFFFDE68A) : const Color(0xFF92400E);
      case CkAlertVariant.error:
        return isDark ? const Color(0xFFFECACA) : const Color(0xFF991B1B);
    }
  }

  Color _borderColor(bool isDark) {
    switch (variant) {
      case CkAlertVariant.info:
        return isDark ? const Color(0xFF1E40AF) : const Color(0xFFBFDBFE);
      case CkAlertVariant.success:
        return isDark ? const Color(0xFF065F46) : const Color(0xFFA7F3D0);
      case CkAlertVariant.warning:
        return isDark ? const Color(0xFF92400E) : const Color(0xFFFDE68A);
      case CkAlertVariant.error:
        return isDark ? const Color(0xFF991B1B) : const Color(0xFFFECACA);
    }
  }

  IconData get _defaultIcon {
    switch (variant) {
      case CkAlertVariant.info:
        return Icons.info_outline;
      case CkAlertVariant.success:
        return Icons.check_circle_outline;
      case CkAlertVariant.warning:
        return Icons.warning_amber_outlined;
      case CkAlertVariant.error:
        return Icons.error_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = _backgroundColor(isDark);
    final fg = _foregroundColor(isDark);
    final border = _borderColor(isDark);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
        border: Border.all(color: border),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 2, right: 12),
            child: icon ?? Icon(_defaultIcon, size: 20, color: fg),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (title != null)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Text(
                      title!,
                      style: GoogleFonts.inter(
                        fontSize: CookestTokens.fontSizeSm,
                        fontWeight: CookestTokens.fontWeightSemibold,
                        color: fg,
                      ),
                    ),
                  ),
                DefaultTextStyle(
                  style: GoogleFonts.inter(
                    fontSize: CookestTokens.fontSizeSm,
                    color: fg,
                  ),
                  child: child,
                ),
              ],
            ),
          ),
          if (dismissible)
            GestureDetector(
              onTap: onDismiss,
              child: Padding(
                padding: const EdgeInsets.only(left: 8),
                child: Icon(Icons.close, size: 16, color: fg),
              ),
            ),
        ],
      ),
    );
  }
}
