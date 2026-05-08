import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Tabs variant matching the React Tabs component.
enum CkTabsVariant { underline, pills, boxed }

/// A single tab item.
class CkTabItem {
  const CkTabItem({
    required this.id,
    required this.label,
    this.icon,
    this.badge,
    this.content,
  });

  final String id;
  final String label;
  final Widget? icon;
  final String? badge;
  final Widget? content;
}

/// A tabs component matching the web @cookest/ui Tabs.
///
/// Supports [underline], [pills], and [boxed] variants with animated
/// indicator transitions.
///
/// ```dart
/// CkTabs(
///   variant: CkTabsVariant.underline,
///   items: [
///     CkTabItem(id: 'overview', label: 'Overview', content: Text('...')),
///     CkTabItem(id: 'details', label: 'Details', content: Text('...')),
///   ],
/// )
/// ```
class CkTabs extends StatefulWidget {
  const CkTabs({
    super.key,
    required this.items,
    this.variant = CkTabsVariant.underline,
    this.initialTab,
    this.onChanged,
    this.fullWidth = false,
  });

  final List<CkTabItem> items;
  final CkTabsVariant variant;
  final String? initialTab;
  final ValueChanged<String>? onChanged;
  final bool fullWidth;

  @override
  State<CkTabs> createState() => _CkTabsState();
}

class _CkTabsState extends State<CkTabs> with SingleTickerProviderStateMixin {
  late String _activeTab;
  late AnimationController _animController;
  late Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _activeTab = widget.initialTab ?? widget.items.first.id;
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
      value: 1.0,
    );
    _fadeAnim = CurvedAnimation(parent: _animController, curve: Curves.easeOut);
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  void _selectTab(String id) {
    if (id == _activeTab) return;
    _animController.forward(from: 0).then((_) {
      setState(() => _activeTab = id);
      widget.onChanged?.call(id);
    });
  }

  CkTabItem get _activeItem =>
      widget.items.firstWhere((t) => t.id == _activeTab);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildTabBar(isDark),
        if (_activeItem.content != null)
          FadeTransition(
            opacity: _fadeAnim,
            child: Padding(
              padding: const EdgeInsets.only(top: 16),
              child: _activeItem.content!,
            ),
          ),
      ],
    );
  }

  Widget _buildTabBar(bool isDark) {
    switch (widget.variant) {
      case CkTabsVariant.underline:
        return _buildUnderlineBar(isDark);
      case CkTabsVariant.pills:
        return _buildPillsBar(isDark);
      case CkTabsVariant.boxed:
        return _buildBoxedBar(isDark);
    }
  }

  Widget _buildUnderlineBar(bool isDark) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: isDark ? CookestTokens.colorBorderDark : CookestTokens.colorBorderLight,
          ),
        ),
      ),
      child: Row(
        children: widget.items.map((tab) {
          final active = tab.id == _activeTab;
          return GestureDetector(
            onTap: () => _selectTab(tab.id),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: active
                        ? CookestTokens.colorPrimaryDEFAULT
                        : Colors.transparent,
                    width: 2,
                  ),
                ),
              ),
              child: _tabLabel(tab, active, isDark),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildPillsBar(bool isDark) {
    return Row(
      children: widget.items.map((tab) {
        final active = tab.id == _activeTab;
        return Padding(
          padding: const EdgeInsets.only(right: 4),
          child: GestureDetector(
            onTap: () => _selectTab(tab.id),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(
                color: active
                    ? CookestTokens.colorPrimaryDEFAULT
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
              ),
              child: _tabLabel(tab, active, isDark, forceLight: active),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildBoxedBar(bool isDark) {
    final bgColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final activeBg = isDark
        ? CookestTokens.colorCardDark
        : Colors.white;

    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(CookestTokens.radiusLg),
        border: Border.all(
          color: isDark ? CookestTokens.colorBorderDark : CookestTokens.colorBorderLight,
        ),
      ),
      child: Row(
        children: widget.items.map((tab) {
          final active = tab.id == _activeTab;
          return Expanded(
            child: GestureDetector(
              onTap: () => _selectTab(tab.id),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  color: active ? activeBg : Colors.transparent,
                  borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
                  boxShadow: active
                      ? [
                          BoxShadow(
                            color: Colors.black.withAlpha(20),
                            blurRadius: 4,
                            offset: const Offset(0, 1),
                          )
                        ]
                      : null,
                ),
                child: Center(child: _tabLabel(tab, active, isDark)),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _tabLabel(CkTabItem tab, bool active, bool isDark,
      {bool forceLight = false}) {
    final mutedColor = isDark ? CookestTokens.colorMutedDark : CookestTokens.colorMutedLight;
    final textColor = forceLight
        ? Colors.white
        : active
            ? CookestTokens.colorPrimaryDEFAULT
            : mutedColor;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (tab.icon != null)
          Padding(
            padding: const EdgeInsets.only(right: 6),
            child: IconTheme(
              data: IconThemeData(color: textColor, size: 16),
              child: tab.icon!,
            ),
          ),
        Text(
          tab.label,
          style: GoogleFonts.inter(
            fontSize: CookestTokens.fontSizeSm,
            fontWeight:
                active ? CookestTokens.fontWeightSemibold : CookestTokens.fontWeightNormal,
            color: textColor,
          ),
        ),
        if (tab.badge != null)
          Padding(
            padding: const EdgeInsets.only(left: 6),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
              decoration: BoxDecoration(
                color: active
                    ? CookestTokens.colorPrimaryDEFAULT.withAlpha(25)
                    : (isDark
                        ? CookestTokens.colorBorderDark
                        : CookestTokens.colorBorderLight),
                borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
              ),
              child: Text(
                tab.badge!,
                style: TextStyle(
                  fontSize: CookestTokens.fontSizeXs,
                  fontWeight: CookestTokens.fontWeightMedium,
                  color: active ? CookestTokens.colorPrimaryDEFAULT : mutedColor,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
