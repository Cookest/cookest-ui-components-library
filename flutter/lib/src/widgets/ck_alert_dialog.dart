import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';
import 'ck_button.dart';

/// An alert dialog component matching the web @cookest/ui AlertDialog.
class CkAlertDialog extends StatelessWidget {
  const CkAlertDialog({
    super.key,
    required this.title,
    required this.description,
    this.cancelLabel = 'Cancel',
    this.actionLabel = 'Continue',
    this.onCancel,
    this.onAction,
  });

  final String title;
  final String description;
  final String cancelLabel;
  final String actionLabel;
  final VoidCallback? onCancel;
  final VoidCallback? onAction;

  static Future<void> show(
    BuildContext context, {
    required String title,
    required String description,
    String cancelLabel = 'Cancel',
    String actionLabel = 'Continue',
    VoidCallback? onCancel,
    VoidCallback? onAction,
  }) {
    return showDialog(
      context: context,
      builder: (context) => CkAlertDialog(
        title: title,
        description: description,
        cancelLabel: cancelLabel,
        actionLabel: actionLabel,
        onCancel: onCancel,
        onAction: onAction,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Dialog(
      backgroundColor: surfaceColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(CookestTokens.radiusN2xl),
        side: BorderSide(color: borderColor),
      ),
      child: Padding(
        padding: const EdgeInsets.all(CookestTokens.componentspacingXl),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: GoogleFonts.playfairDisplay(
                fontSize: CookestTokens.fontSizeXl,
                fontWeight: CookestTokens.fontWeightBold,
                color: headingColor,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeSm,
                color: mutedColor,
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                CkButton(
                  variant: CkButtonVariant.secondary,
                  size: CkButtonSize.md,
                  onPressed: () {
                    Navigator.of(context).pop();
                    onCancel?.call();
                  },
                  child: Text(cancelLabel),
                ),
                const SizedBox(width: 8),
                CkButton(
                  variant: CkButtonVariant.primary,
                  size: CkButtonSize.md,
                  onPressed: () {
                    Navigator.of(context).pop();
                    onAction?.call();
                  },
                  child: Text(actionLabel),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
