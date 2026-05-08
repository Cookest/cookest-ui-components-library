import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// Spinner color variants matching the React Spinner component.
enum CkSpinnerColor { primary, blue, amber, rose, white, muted }

/// Spinner size.
enum CkSpinnerSize { sm, md, lg, xl }

/// A circular spinner component matching the web @cookest/ui Spinner.
///
/// Uses a dual-arc animated ring for a polished look.
///
/// ```dart
/// // Standalone
/// CkSpinner(color: CkSpinnerColor.primary, size: CkSpinnerSize.md)
///
/// // In a button
/// CkButton(
///   loading: true,
///   child: Row(children: [
///     CkSpinner(color: CkSpinnerColor.white, size: CkSpinnerSize.sm),
///     SizedBox(width: 8),
///     Text('Saving...'),
///   ]),
/// )
/// ```
class CkSpinner extends StatefulWidget {
  const CkSpinner({
    super.key,
    this.color = CkSpinnerColor.primary,
    this.size = CkSpinnerSize.md,
    this.strokeWidth,
  });

  final CkSpinnerColor color;
  final CkSpinnerSize size;
  final double? strokeWidth;

  @override
  State<CkSpinner> createState() => _CkSpinnerState();
}

class _CkSpinnerState extends State<CkSpinner>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Color _resolveColor(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    switch (widget.color) {
      case CkSpinnerColor.primary:
        return CookestTokens.colorPrimaryDEFAULT;
      case CkSpinnerColor.blue:
        return const Color(0xFF3B82F6);
      case CkSpinnerColor.amber:
        return const Color(0xFFF59E0B);
      case CkSpinnerColor.rose:
        return const Color(0xFFF43F5E);
      case CkSpinnerColor.white:
        return Colors.white;
      case CkSpinnerColor.muted:
        return isDark
            ? CookestTokens.colorMutedDark
            : CookestTokens.colorMutedLight;
    }
  }

  double get _diameter {
    switch (widget.size) {
      case CkSpinnerSize.sm:
        return 16;
      case CkSpinnerSize.md:
        return 24;
      case CkSpinnerSize.lg:
        return 32;
      case CkSpinnerSize.xl:
        return 48;
    }
  }

  double get _stroke {
    if (widget.strokeWidth != null) return widget.strokeWidth!;
    switch (widget.size) {
      case CkSpinnerSize.sm:
        return 2;
      case CkSpinnerSize.md:
        return 2.5;
      case CkSpinnerSize.lg:
        return 3;
      case CkSpinnerSize.xl:
        return 4;
    }
  }

  @override
  Widget build(BuildContext context) {
    final activeColor = _resolveColor(context);
    final trackColor = activeColor.withAlpha(38);

    return SizedBox(
      width: _diameter,
      height: _diameter,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          return CustomPaint(
            painter: _SpinnerPainter(
              progress: _controller.value,
              activeColor: activeColor,
              trackColor: trackColor,
              strokeWidth: _stroke,
            ),
          );
        },
      ),
    );
  }
}

class _SpinnerPainter extends CustomPainter {
  _SpinnerPainter({
    required this.progress,
    required this.activeColor,
    required this.trackColor,
    required this.strokeWidth,
  });

  final double progress;
  final Color activeColor;
  final Color trackColor;
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - strokeWidth) / 2;
    const startAngle = -1.5707963; // -π/2 (top)
    const sweep = 5.497787; // ~315° in radians

    // Track ring
    canvas.drawCircle(
      center,
      radius,
      Paint()
        ..color = trackColor
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.round,
    );

    // Spinning arc
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle + (progress * 6.283185), // full rotation
      sweep * (0.2 + 0.6 * (0.5 - (progress - 0.5).abs())), // breathe
      false,
      Paint()
        ..color = activeColor
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.round,
    );
  }

  @override
  bool shouldRepaint(_SpinnerPainter old) =>
      old.progress != progress ||
      old.activeColor != activeColor ||
      old.strokeWidth != strokeWidth;
}
