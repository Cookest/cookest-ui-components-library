import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// A command palette item.
class CkCommandItem<T> {
  const CkCommandItem({
    required this.label,
    required this.value,
    this.icon,
    this.group,
  });

  final String label;
  final T value;
  final Widget? icon;
  final String? group;
}

/// A command palette component matching the web @cookest/ui Command.
class CkCommand<T> extends StatefulWidget {
  const CkCommand({
    super.key,
    required this.items,
    required this.onSelected,
    this.placeholder = 'Type a command or search...',
  });

  final List<CkCommandItem<T>> items;
  final ValueChanged<T> onSelected;
  final String placeholder;

  @override
  State<CkCommand<T>> createState() => _CkCommandState<T>();
}

class _CkCommandState<T> extends State<CkCommand<T>> {
  final TextEditingController _searchController = TextEditingController();
  List<CkCommandItem<T>> _filteredItems = [];

  @override
  void initState() {
    super.initState();
    _filteredItems = widget.items;
    _searchController.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      _filteredItems = widget.items.where((item) {
        return item.label.toLowerCase().contains(query) ||
            (item.group?.toLowerCase().contains(query) ?? false);
      }).toList();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
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

    // Group items
    final grouped = <String, List<CkCommandItem<T>>>{};
    for (final item in _filteredItems) {
      final g = item.group ?? '';
      grouped.putIfAbsent(g, () => []).add(item);
    }

    return Container(
      decoration: BoxDecoration(
        color: surfaceColor,
        borderRadius: BorderRadius.circular(CookestTokens.radiusLg),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Search input
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Icon(Icons.search, size: 18, color: mutedColor),
                const SizedBox(width: 12),
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    autofocus: true,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: headingColor,
                    ),
                    decoration: InputDecoration(
                      hintText: widget.placeholder,
                      hintStyle: TextStyle(color: mutedColor),
                      border: InputBorder.none,
                      isDense: true,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, thickness: 1),
          // List
          Flexible(
            child: ListView(
              shrinkWrap: true,
              padding: const EdgeInsets.symmetric(vertical: 8),
              children: [
                if (_filteredItems.isEmpty)
                  Padding(
                    padding: const EdgeInsets.all(24),
                    child: Center(
                      child: Text(
                        'No results found.',
                        style: TextStyle(color: mutedColor, fontSize: 13),
                      ),
                    ),
                  ),
                for (final group in grouped.entries) ...[
                  if (group.key.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: Text(
                        group.key,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: mutedColor,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                  for (final item in group.value)
                    _CommandListTile<T>(
                      item: item,
                      onTap: () => widget.onSelected(item.value),
                      headingColor: headingColor,
                      mutedColor: mutedColor,
                    ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _CommandListTile<T> extends StatelessWidget {
  const _CommandListTile({
    required this.item,
    required this.onTap,
    required this.headingColor,
    required this.mutedColor,
  });

  final CkCommandItem<T> item;
  final VoidCallback onTap;
  final Color headingColor;
  final Color mutedColor;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Row(
          children: [
            if (item.icon != null) ...[
              item.icon!,
              const SizedBox(width: 12),
            ],
            Expanded(
              child: Text(
                item.label,
                style: TextStyle(
                  color: headingColor,
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
