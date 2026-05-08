import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// Slider color variants matching the React Slider component.
enum CkSliderColor { primary, blue, amber, rose }

/// Slider size.
enum CkSliderSize { sm, md, lg }

/// A mark on the slider track.
class CkSliderMark {
  const CkSliderMark({required this.value, this.label});
  final double value;
  final String? label;
}

/// A slider component matching the web @cookest/ui Slider.
///
/// Supports color [color], [size], optional [marks], [showValue] badge,
/// and min/max/step configuration.
///
/// ```dart
/// CkSlider(
///   value: _volume,
///   onChanged: (v) => setState(() => _volume = v),
///   color: CkSliderColor.primary,
///   showValue: true,
///   marks: [
///     CkSliderMark(value: 0, label: '0'),
///     CkSliderMark(value: 50, label: '50'),
///     CkSliderMark(value: 100, label: '100'),
///   ],
/// )
/// ```
class CkSlider extends StatelessWidget {
  const CkSlider({
    super.key,
    required this.value,
    required this.onChanged,
    this.min = 0,
    this.max = 100,
    this.step,
    this.color = CkSliderColor.primary,
    this.size = CkSliderSize.md,
    this.marks = const [],
    this.showValue = false,
    this.disabled = false,
    this.label,
  });

  final double value;
  final ValueChanged<double>? onChanged;
  final double min;
  final double max;
  final double? step;
  final CkSliderColor color;
  final CkSliderSize size;
  final List<CkSliderMark> marks;
  final bool showValue;
  final bool disabled;
  final String? label;

  Color get _activeColor {
    switch (color) {
      case CkSliderColor.primary:
        return CookestTokens.colorPrimaryDEFAULT;
      case CkSliderColor.blue:
        return const Color(0xFF3B82F6);
      case CkSliderColor.amber:
        return const Color(0xFFF59E0B);
      case CkSliderColor.rose:
        return const Color(0xFFF43F5E);
    }
  }

  double get _trackHeight {
    switch (size) {
      case CkSliderSize.sm:
        return 4;
      case CkSliderSize.md:
        return 6;
      case CkSliderSize.lg:
        return 8;
    }
  }

  double get _thumbRadius {
    switch (size) {
      case CkSliderSize.sm:
        return 8;
      case CkSliderSize.md:
        return 10;
      case CkSliderSize.lg:
        return 12;
    }
  }

  int get _divisions {
    if (step != null && step! > 0) {
      return ((max - min) / step!).round();
    }
    return marks.isNotEmpty ? marks.length - 1 : 0;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final trackInactiveColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final fg = isDark ? CookestTokens.colorTextDark : CookestTokens.colorTextLight;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null || showValue)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (label != null)
                  Text(
                    label!,
                    style: TextStyle(
                      fontSize: CookestTokens.fontSizeSm,
                      fontWeight: CookestTokens.fontWeightMedium,
                      color: fg,
                    ),
                  ),
                if (showValue)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: _activeColor.withAlpha(25),
                      borderRadius: BorderRadius.circular(CookestTokens.radiusFull),
                      border: Border.all(color: _activeColor.withAlpha(76)),
                    ),
                    child: Text(
                      value.round().toString(),
                      style: TextStyle(
                        fontSize: CookestTokens.fontSizeXs,
                        fontWeight: CookestTokens.fontWeightSemibold,
                        color: _activeColor,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        SliderTheme(
          data: SliderThemeData(
            trackHeight: _trackHeight,
            thumbRadius: _thumbRadius,
            activeTrackColor: _activeColor,
            inactiveTrackColor: trackInactiveColor,
            thumbColor: Colors.white,
            overlayColor: _activeColor.withAlpha(51),
            overlayShape: RoundSliderOverlayShape(overlayRadius: _thumbRadius + 6),
            thumbShape: _CkThumbShape(
              radius: _thumbRadius,
              activeColor: _activeColor,
            ),
            tickMarkShape: RoundSliderTickMarkShape(tickMarkRadius: 2),
            activeTickMarkColor: Colors.white.withAlpha(153),
            inactiveTickMarkColor: _activeColor.withAlpha(102),
          ),
          child: Slider(
            value: value.clamp(min, max),
            min: min,
            max: max,
            divisions: _divisions > 0 ? _divisions : null,
            onChanged: disabled ? null : onChanged,
          ),
        ),
        if (marks.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: marks
                  .where((m) => m.label != null)
                  .map((m) => Text(
                        m.label!,
                        style: TextStyle(
                          fontSize: CookestTokens.fontSizeXs,
                          color: fg.withAlpha(153),
                        ),
                      ))
                  .toList(),
            ),
          ),
      ],
    );
  }
}

class _CkThumbShape extends SliderComponentShape {
  const _CkThumbShape({required this.radius, required this.activeColor});
  final double radius;
  final Color activeColor;

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) =>
      Size.fromRadius(radius);

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    required bool isDiscrete,
    required TextPainter labelPainter,
    required RenderBox parentBox,
    required SliderThemeData sliderTheme,
    required TextDirection textDirection,
    required double value,
    required double textScaleFactor,
    required Size sizeWithOverflow,
  }) {
    final canvas = context.canvas;
    // Shadow
    canvas.drawCircle(
      center + const Offset(0, 2),
      radius,
      Paint()
        ..color = Colors.black.withAlpha(38)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4),
    );
    // White fill
    canvas.drawCircle(center, radius, Paint()..color = Colors.white);
    // Colored ring
    canvas.drawCircle(
      center,
      radius,
      Paint()
        ..color = activeColor
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5,
    );
    // Inner dot
    canvas.drawCircle(center, radius * 0.35, Paint()..color = activeColor);
  }
}
