import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Accordion variant matching the React Accordion component.
enum CkAccordionVariant { default_, bordered, separated }

/// A single accordion item.
class CkAccordionItem {
  const CkAccordionItem({
    required this.id,
    required this.title,
    required this.content,
    this.subtitle,
    this.icon,
    this.disabled = false,
  });

  final String id;
  final String title;
  final Widget content;
  final String? subtitle;
  final Widget? icon;
  final bool disabled;
}

/// An accordion component matching the web @cookest/ui Accordion.
///
/// Supports animated expansion, [multiple] open panels, and three [variant]s.
///
/// ```dart
/// CkAccordion(
///   variant: CkAccordionVariant.default_,
///   items: [
///     CkAccordionItem(
///       id: 'q1',
///       title: 'What is Cookest?',
///       content: Text('A meal planning platform...'),
///     ),
///   ],
/// )
/// ```
class CkAccordion extends StatefulWidget {
  const CkAccordion({
    super.key,
    required this.items,
    this.variant = CkAccordionVariant.default_,
    this.multiple = false,
    this.defaultOpen,
  });

  final List<CkAccordionItem> items;
  final CkAccordionVariant variant;
  final bool multiple;
  final Set<String>? defaultOpen;

  @override
  State<CkAccordion> createState() => _CkAccordionState();
}

class _CkAccordionState extends State<CkAccordion> {
  late Set<String> _openItems;

  @override
  void initState() {
    super.initState();
    _openItems = Set.from(widget.defaultOpen ?? {});
  }

  void _toggle(String id) {
    setState(() {
      if (_openItems.contains(id)) {
        _openItems.remove(id);
      } else {
        if (!widget.multiple) _openItems.clear();
        _openItems.add(id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSeparated = widget.variant == CkAccordionVariant.separated;

    if (isSeparated) {
      return Column(
        children: widget.items
            .map((item) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: _buildItem(item, isDark, index: 0, total: 1),
                ))
            .toList(),
      );
    }

    return Container(
      decoration: widget.variant == CkAccordionVariant.bordered
          ? BoxDecoration(
              border: Border.all(
                color: isDark
                    ? CookestTokens.colorBorderDark
                    : CookestTokens.colorBorderLight,
              ),
              borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
            )
          : null,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(
          widget.variant == CkAccordionVariant.bordered ? CookestTokens.radiusXl : 0,
        ),
        child: Column(
          children: widget.items.asMap().entries.map((entry) {
            return _buildItem(
              entry.value,
              isDark,
              index: entry.key,
              total: widget.items.length,
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildItem(
    CkAccordionItem item,
    bool isDark, {
    required int index,
    required int total,
  }) {
    final isOpen = _openItems.contains(item.id);
    final fg = isDark ? CookestTokens.colorHeadingDark : CookestTokens.colorHeadingLight;
    final muted = isDark ? CookestTokens.colorMutedDark : CookestTokens.colorMutedLight;
    final borderColor = isDark ? CookestTokens.colorBorderDark : CookestTokens.colorBorderLight;
    final isSeparated = widget.variant == CkAccordionVariant.separated;

    Widget card = Container(
      decoration: isSeparated
          ? BoxDecoration(
              border: Border.all(color: borderColor),
              borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
            )
          : null,
      child: Column(
        children: [
          GestureDetector(
            onTap: item.disabled ? null : () => _toggle(item.id),
            behavior: HitTestBehavior.opaque,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(
                children: [
                  if (item.icon != null)
                    Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: IconTheme(
                        data: IconThemeData(
                          color: isOpen ? CookestTokens.colorPrimaryDEFAULT : muted,
                          size: 18,
                        ),
                        child: item.icon!,
                      ),
                    ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item.title,
                          style: GoogleFonts.inter(
                            fontSize: CookestTokens.fontSizeSm,
                            fontWeight: CookestTokens.fontWeightMedium,
                            color: item.disabled ? muted : fg,
                          ),
                        ),
                        if (item.subtitle != null)
                          Text(
                            item.subtitle!,
                            style: TextStyle(
                              fontSize: CookestTokens.fontSizeXs,
                              color: muted,
                            ),
                          ),
                      ],
                    ),
                  ),
                  AnimatedRotation(
                    turns: isOpen ? 0.5 : 0,
                    duration: const Duration(milliseconds: 250),
                    curve: Curves.easeInOut,
                    child: Icon(
                      Icons.keyboard_arrow_down,
                      size: 18,
                      color: item.disabled
                          ? muted.withAlpha(128)
                          : isOpen
                              ? CookestTokens.colorPrimaryDEFAULT
                              : muted,
                    ),
                  ),
                ],
              ),
            ),
          ),
          AnimatedCrossFade(
            firstChild: const SizedBox(height: 0, width: double.infinity),
            secondChild: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
              child: DefaultTextStyle(
                style: TextStyle(
                  fontSize: CookestTokens.fontSizeSm,
                  color: muted,
                  height: 1.6,
                ),
                child: item.content,
              ),
            ),
            crossFadeState:
                isOpen ? CrossFadeState.showSecond : CrossFadeState.showFirst,
            duration: const Duration(milliseconds: 250),
            sizeCurve: Curves.easeInOut,
          ),
          // Divider between items (not last, not separated)
          if (!isSeparated && index < total - 1)
            Divider(height: 1, color: borderColor),
        ],
      ),
    );

    return card;
  }
}
