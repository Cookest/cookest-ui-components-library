import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A context menu item.
class CkContextMenuItem<T> {
  const CkContextMenuItem({
    required this.label,
    required this.value,
    this.icon,
  });

  final String label;
  final T value;
  final Widget? icon;
}

/// A context menu component matching the web @cookest/ui ContextMenu.
class CkContextMenu<T> extends StatelessWidget {
  const CkContextMenu({
    super.key,
    required this.child,
    required this.items,
    required this.onSelected,
  });

  final Widget child;
  final List<CkContextMenuItem<T>> items;
  final ValueChanged<T> onSelected;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;

    return GestureDetector(
      onSecondaryTapDown: (details) {
        final overlay = Overlay.of(context).context.findRenderObject() as RenderBox;
        showMenu<T>(
          context: context,
          position: RelativeRect.fromRect(
            details.globalPosition & const Size(40, 40),
            Offset.zero & overlay.size,
          ),
          color: surfaceColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
            side: BorderSide(
              color: isDark ? CookestTokens.colorBorderDark : CookestTokens.colorBorderLight,
            ),
          ),
          items: items.map((item) {
            return PopupMenuItem<T>(
              value: item.value,
              child: Row(
                children: [
                  if (item.icon != null) ...[
                    item.icon!,
                    const SizedBox(width: 12),
                  ],
                  Text(
                    item.label,
                    style: TextStyle(color: headingColor, fontSize: 14),
                  ),
                ],
              ),
            );
          }).toList(),
        ).then((value) {
          if (value != null) onSelected(value);
        });
      },
      child: child,
    );
  }
}
