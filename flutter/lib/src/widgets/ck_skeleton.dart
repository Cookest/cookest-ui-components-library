import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// Skeleton variant matching the React Skeleton component.
enum CkSkeletonVariant { text, circular, rectangular }

/// A skeleton loading placeholder matching the web @cookest/ui Skeleton.
class CkSkeleton extends StatefulWidget {
  const CkSkeleton({
    super.key,
    this.variant = CkSkeletonVariant.text,
    this.width,
    this.height,
    this.lines,
  });

  final CkSkeletonVariant variant;
  final double? width;
  final double? height;
  final int? lines;

  @override
  State<CkSkeleton> createState() => _CkSkeletonState();
}

class _CkSkeletonState extends State<CkSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat(reverse: true);
    _animation = Tween(begin: 0.3, end: 0.7).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  double get _defaultWidth {
    switch (widget.variant) {
      case CkSkeletonVariant.circular:
        return 40;
      case CkSkeletonVariant.text:
      case CkSkeletonVariant.rectangular:
        return double.infinity;
    }
  }

  double get _defaultHeight {
    switch (widget.variant) {
      case CkSkeletonVariant.text:
        return 16;
      case CkSkeletonVariant.circular:
        return 40;
      case CkSkeletonVariant.rectangular:
        return 80;
    }
  }

  BorderRadius get _borderRadius {
    switch (widget.variant) {
      case CkSkeletonVariant.text:
        return BorderRadius.circular(CookestTokens.radiusMd);
      case CkSkeletonVariant.circular:
        return BorderRadius.circular(CookestTokens.radiusFull);
      case CkSkeletonVariant.rectangular:
        return BorderRadius.circular(CookestTokens.radiusXl);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final baseColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    // Multi-line text skeleton
    if (widget.lines != null && widget.lines! > 1 &&
        widget.variant == CkSkeletonVariant.text) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: List.generate(widget.lines!, (i) {
          final isLast = i == widget.lines! - 1;
          return Padding(
            padding: EdgeInsets.only(bottom: isLast ? 0 : 8),
            child: AnimatedBuilder(
              animation: _animation,
              builder: (_, __) => Container(
                width: isLast
                    ? (widget.width ?? double.infinity) * 0.75
                    : widget.width ?? double.infinity,
                height: widget.height ?? 16,
                decoration: BoxDecoration(
                  color: baseColor.withAlpha(
                    (_animation.value * 255).toInt(),
                  ),
                  borderRadius: BorderRadius.circular(
                    CookestTokens.radiusMd,
                  ),
                ),
              ),
            ),
          );
        }),
      );
    }

    return AnimatedBuilder(
      animation: _animation,
      builder: (_, __) => Container(
        width: widget.width ?? _defaultWidth,
        height: widget.height ?? _defaultHeight,
        decoration: BoxDecoration(
          color: baseColor.withAlpha((_animation.value * 255).toInt()),
          borderRadius: _borderRadius,
        ),
      ),
    );
  }
}

/// Skeleton card with image + text placeholders — matches React SkeletonCard.
class CkSkeletonCard extends StatelessWidget {
  const CkSkeletonCard({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: surfaceColor,
        borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
        border: Border.all(color: borderColor),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CkSkeleton(variant: CkSkeletonVariant.rectangular, height: 160),
          SizedBox(height: 16),
          CkSkeleton(width: 200),
          SizedBox(height: 8),
          CkSkeleton(lines: 2),
        ],
      ),
    );
  }
}
