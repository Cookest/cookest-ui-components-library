import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// A breadcrumb item for [CkBreadcrumb].
class CkBreadcrumbItem {
  const CkBreadcrumbItem({
    required this.label,
    this.onPressed,
    this.isCurrent = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final bool isCurrent;
}

/// A breadcrumb component matching the web @cookest/ui Breadcrumb.
class CkBreadcrumb extends StatelessWidget {
  const CkBreadcrumb({
    super.key,
    required this.items,
    this.separator,
  });

  final List<CkBreadcrumbItem> items;
  final Widget? separator;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;

    final defaultSeparator = Icon(
      Icons.chevron_right,
      size: 14,
      color: mutedColor,
    );

    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 8,
      children: [
        for (int i = 0; i < items.length; i++) ...[
          _BreadcrumbItemWidget(
            item: items[i],
            headingColor: headingColor,
            mutedColor: mutedColor,
          ),
          if (i < items.length - 1) separator ?? defaultSeparator,
        ],
      ],
    );
  }
}

class _BreadcrumbItemWidget extends StatelessWidget {
  const _BreadcrumbItemWidget({
    required this.item,
    required this.headingColor,
    required this.mutedColor,
  });

  final CkBreadcrumbItem item;
  final Color headingColor;
  final Color mutedColor;

  @override
  Widget build(BuildContext context) {
    final style = GoogleFonts.inter(
      fontSize: CookestTokens.fontSizeSm,
      fontWeight: item.isCurrent ? CookestTokens.fontWeightSemibold : CookestTokens.fontWeightNormal,
      color: item.isCurrent ? headingColor : mutedColor,
    );

    if (item.isCurrent || item.onPressed == null) {
      return Text(item.label, style: style);
    }

    return GestureDetector(
      onTap: item.onPressed,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Text(item.label, style: style),
      ),
    );
  }
}
