import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A menubar item.
class CkMenubarItem {
  const CkMenubarItem({
    required this.label,
    this.children = const [],
    this.onTap,
  });

  final String label;
  final List<CkMenubarItem> children;
  final VoidCallback? onTap;
}

/// A menubar component matching the web @cookest/ui Menubar.
class CkMenubar extends StatelessWidget {
  const CkMenubar({
    super.key,
    required this.items,
  });

  final List<CkMenubarItem> items;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Container(
      decoration: BoxDecoration(
        color: surfaceColor,
        borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
        border: Border.all(color: borderColor),
      ),
      child: MenuBar(
        style: MenuStyle(
          backgroundColor: WidgetStateProperty.all(Colors.transparent),
          elevation: WidgetStateProperty.all(0),
        ),
        children: items.map((item) => _buildMenu(item, headingColor)).toList(),
      ),
    );
  }

  Widget _buildMenu(CkMenubarItem item, Color textColor) {
    if (item.children.isEmpty) {
      return MenuItemButton(
        onPressed: item.onTap,
        child: Text(item.label, style: TextStyle(color: textColor, fontSize: 13)),
      );
    }

    return SubmenuButton(
      menuChildren: item.children.map((child) => _buildMenu(child, textColor)).toList(),
      child: Text(item.label, style: TextStyle(color: textColor, fontSize: 13)),
    );
  }
}
