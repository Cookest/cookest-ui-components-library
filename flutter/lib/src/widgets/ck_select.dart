import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Select option data.
class CkSelectOption {
  const CkSelectOption({
    required this.value,
    required this.label,
    this.enabled = true,
  });

  final String value;
  final String label;
  final bool enabled;
}

/// A dropdown select matching the web @cookest/ui Select.
class CkSelect extends StatefulWidget {
  const CkSelect({
    super.key,
    required this.options,
    this.value,
    this.onChanged,
    this.placeholder = 'Select...',
    this.label,
    this.error,
    this.enabled = true,
    this.searchable = false,
  });

  final List<CkSelectOption> options;
  final String? value;
  final ValueChanged<String>? onChanged;
  final String placeholder;
  final String? label;
  final String? error;
  final bool enabled;
  final bool searchable;

  @override
  State<CkSelect> createState() => _CkSelectState();
}

class _CkSelectState extends State<CkSelect> {
  final _searchController = TextEditingController();

  CkSelectOption? get _selectedOption {
    if (widget.value == null) return null;
    return widget.options
        .where((o) => o.value == widget.value)
        .firstOrNull;
  }

  void _openDropdown() {
    if (!widget.enabled) return;

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
    final cardColor = isDark
        ? CookestTokens.colorCardDark
        : CookestTokens.colorCardLight;

    showModalBottomSheet(
      context: context,
      backgroundColor: surfaceColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(24),
        ),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setSheetState) {
            final query = _searchController.text.toLowerCase();
            final filtered = widget.searchable && query.isNotEmpty
                ? widget.options
                    .where((o) =>
                        o.label.toLowerCase().contains(query))
                    .toList()
                : widget.options;

            return SafeArea(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(top: 12, bottom: 8),
                    decoration: BoxDecoration(
                      color: borderColor,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  if (widget.searchable)
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: TextField(
                        controller: _searchController,
                        onChanged: (_) => setSheetState(() {}),
                        decoration: InputDecoration(
                          hintText: 'Search...',
                          hintStyle: GoogleFonts.inter(
                            fontSize: CookestTokens.fontSizeSm,
                            color: mutedColor,
                          ),
                          prefixIcon: Icon(
                            Icons.search,
                            size: 20,
                            color: mutedColor,
                          ),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(
                              CookestTokens.radiusLg,
                            ),
                            borderSide: BorderSide(color: borderColor),
                          ),
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                        ),
                        style: GoogleFonts.inter(
                          fontSize: CookestTokens.fontSizeSm,
                          color: headingColor,
                        ),
                      ),
                    ),
                  ConstrainedBox(
                    constraints: const BoxConstraints(maxHeight: 300),
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: filtered.length,
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      itemBuilder: (ctx, i) {
                        final opt = filtered[i];
                        final isSelected = opt.value == widget.value;
                        return ListTile(
                          enabled: opt.enabled,
                          selected: isSelected,
                          selectedTileColor: CookestTokens
                              .colorPrimaryDEFAULT
                              .withAlpha(26),
                          tileColor: cardColor.withAlpha(0),
                          title: Text(
                            opt.label,
                            style: GoogleFonts.inter(
                              fontSize: CookestTokens.fontSizeSm,
                              fontWeight: isSelected
                                  ? CookestTokens.fontWeightMedium
                                  : CookestTokens.fontWeightNormal,
                              color: isSelected
                                  ? CookestTokens.colorPrimaryDEFAULT
                                  : headingColor,
                            ),
                          ),
                          onTap: opt.enabled
                              ? () {
                                  widget.onChanged?.call(opt.value);
                                  _searchController.clear();
                                  Navigator.of(ctx).pop();
                                }
                              : null,
                        );
                      },
                    ),
                  ),
                  if (filtered.isEmpty)
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Text(
                        'No options found',
                        style: GoogleFonts.inter(
                          fontSize: CookestTokens.fontSizeSm,
                          color: mutedColor,
                        ),
                      ),
                    ),
                ],
              ),
            );
          },
        );
      },
    ).then((_) => _searchController.clear());
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;

    final hasError = widget.error != null && widget.error!.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(
              widget.label!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeSm,
                fontWeight: CookestTokens.fontWeightMedium,
                color: headingColor,
              ),
            ),
          ),
        GestureDetector(
          onTap: _openDropdown,
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: surfaceColor,
              borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
              border: Border.all(
                color: hasError
                    ? CookestTokens.colorStatusError
                    : borderColor,
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    _selectedOption?.label ?? widget.placeholder,
                    style: GoogleFonts.inter(
                      fontSize: CookestTokens.fontSizeSm,
                      color: _selectedOption != null
                          ? headingColor
                          : mutedColor,
                    ),
                  ),
                ),
                Icon(
                  Icons.keyboard_arrow_down,
                  size: 16,
                  color: mutedColor,
                ),
              ],
            ),
          ),
        ),
        if (hasError)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              widget.error!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeXs,
                color: CookestTokens.colorStatusError,
              ),
            ),
          ),
      ],
    );
  }
}
