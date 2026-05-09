import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A navigation menu item.
class CkNavigationMenuItem {
  const CkNavigationMenuItem({
    required this.label,
    required this.onTap,
    this.isActive = false,
  });

  final String label;
  final VoidCallback onTap;
  final bool isActive;
}

/// A navigation menu component matching the web @cookest/ui NavigationMenu.
class CkNavigationMenu extends StatelessWidget {
  const CkNavigationMenu({
    super.key,
    required this.items,
  });

  final List<CkNavigationMenuItem> items;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: items.map((item) {
        return GestureDetector(
          onTap: item.onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(
              item.label,
              style: TextStyle(
                color: item.isActive ? headingColor : mutedColor,
                fontWeight: item.isActive ? FontWeight.bold : FontWeight.normal,
                fontSize: 14,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}
