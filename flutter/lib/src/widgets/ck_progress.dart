import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// Progress color variants matching the React Progress component.
enum CkProgressColor { primary, blue, amber, rose, green }

/// Progress size.
enum CkProgressSize { sm, md, lg }

/// A progress bar component matching the web @cookest/ui Progress.
///
/// Set [value] to null for indeterminate (animated) mode.
/// Supports [striped] and [animated] (striped + motion) modes.
///
/// ```dart
/// // Determinate
/// CkProgress(value: 0.72, color: CkProgressColor.primary, showLabel: true)
///
/// // Indeterminate
/// CkProgress(color: CkProgressColor.blue)
/// ```
class CkProgress extends StatefulWidget {
  const CkProgress({
    super.key,
    this.value,
    this.color = CkProgressColor.primary,
    this.size = CkProgressSize.md,
    this.striped = false,
    this.animated = false,
    this.showLabel = false,
    this.label,
    this.min = 0,
    this.max = 100,
  });

  /// 0–100 (or null for indeterminate).
  final double? value;
  final CkProgressColor color;
  final CkProgressSize size;
  final bool striped;
  final bool animated;
  final bool showLabel;
  final String? label;
  final double min;
  final double max;

  @override
  State<CkProgress> createState() => _CkProgressState();
}

class _CkProgressState extends State<CkProgress>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Color get _activeColor {
    switch (widget.color) {
      case CkProgressColor.primary:
        return CookestTokens.colorPrimaryDEFAULT;
      case CkProgressColor.blue:
        return const Color(0xFF3B82F6);
      case CkProgressColor.amber:
        return const Color(0xFFF59E0B);
      case CkProgressColor.rose:
        return const Color(0xFFF43F5E);
      case CkProgressColor.green:
        return const Color(0xFF22C55E);
    }
  }

  double get _trackHeight {
    switch (widget.size) {
      case CkProgressSize.sm:
        return 4;
      case CkProgressSize.md:
        return 8;
      case CkProgressSize.lg:
        return 12;
    }
  }

  double get _percentage {
    if (widget.value == null) return 0;
    return ((widget.value! - widget.min) / (widget.max - widget.min))
        .clamp(0.0, 1.0);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final trackBg = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final fg = isDark ? CookestTokens.colorTextDark : CookestTokens.colorTextLight;
    final isIndeterminate = widget.value == null;

    Widget track;
    if (isIndeterminate) {
      track = AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          return ClipRRect(
            borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
            child: Container(
              height: _trackHeight,
              color: trackBg,
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final barWidth = constraints.maxWidth * 0.4;
                  final offset = _controller.value * (constraints.maxWidth + barWidth) - barWidth;
                  return Stack(
                    clipBehavior: Clip.hardEdge,
                    children: [
                      Positioned(
                        left: offset,
                        child: Container(
                          width: barWidth,
                          height: _trackHeight,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                _activeColor.withAlpha(0),
                                _activeColor,
                                _activeColor.withAlpha(0),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          );
        },
      );
    } else {
      track = ClipRRect(
        borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
        child: Container(
          height: _trackHeight,
          color: trackBg,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final barWidth = constraints.maxWidth * _percentage;
              return Stack(
                children: [
                  AnimatedBuilder(
                    animation: _controller,
                    builder: (context, _) {
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 600),
                        curve: Curves.easeOut,
                        width: barWidth,
                        height: _trackHeight,
                        decoration: BoxDecoration(
                          color: _activeColor,
                          gradient: widget.striped
                              ? LinearGradient(
                                  begin: Alignment(-1 + _controller.value * 2, 0),
                                  end: Alignment(1 + _controller.value * 2, 0),
                                  colors: [
                                    _activeColor,
                                    _activeColor.withAlpha(179),
                                    _activeColor,
                                  ],
                                  tileMode: TileMode.repeated,
                                )
                              : null,
                        ),
                      );
                    },
                  ),
                ],
              );
            },
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null || widget.showLabel)
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (widget.label != null)
                  Text(
                    widget.label!,
                    style: TextStyle(
                      fontSize: CookestTokens.fontSizeSm,
                      fontWeight: CookestTokens.fontWeightMedium,
                      color: fg,
                    ),
                  ),
                if (widget.showLabel && widget.value != null)
                  Text(
                    '${(_percentage * 100).round()}%',
                    style: TextStyle(
                      fontSize: CookestTokens.fontSizeSm,
                      fontWeight: CookestTokens.fontWeightSemibold,
                      color: _activeColor,
                    ),
                  ),
              ],
            ),
          ),
        track,
      ],
    );
  }
}
