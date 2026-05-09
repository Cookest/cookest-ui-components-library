import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A hover card component matching the web @cookest/ui HoverCard.
class CkHoverCard extends StatefulWidget {
  const CkHoverCard({
    super.key,
    required this.trigger,
    required this.content,
    this.width = 280,
  });

  final Widget trigger;
  final Widget content;
  final double width;

  @override
  State<CkHoverCard> createState() => _CkHoverCardState();
}

class _CkHoverCardState extends State<CkHoverCard> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  bool _isHovered = false;

  void _show() {
    if (_overlayEntry != null) return;
    final overlay = Overlay.of(context);
    _overlayEntry = _createOverlayEntry();
    overlay.insert(_overlayEntry!);
  }

  void _hide() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  OverlayEntry _createOverlayEntry() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return OverlayEntry(
      builder: (context) => Positioned(
        width: widget.width,
        child: CompositedTransformFollower(
          link: _layerLink,
          showWhenUnlinked: false,
          offset: const Offset(0, 44),
          child: Material(
            elevation: 8,
            color: surfaceColor,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
              side: BorderSide(color: borderColor),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: widget.content,
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _hide();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) {
        setState(() => _isHovered = true);
        _show();
      },
      onExit: (_) {
        setState(() => _isHovered = false);
        Future.delayed(const Duration(milliseconds: 100), () {
          if (!_isHovered) _hide();
        });
      },
      child: CompositedTransformTarget(
        link: _layerLink,
        child: widget.trigger,
      ),
    );
  }
}
