import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A resizable panel component matching the web @cookest/ui Resizable.
class CkResizable extends StatefulWidget {
  const CkResizable({
    super.key,
    required this.left,
    required this.right,
    this.initialRatio = 0.5,
  });

  final Widget left;
  final Widget right;
  final double initialRatio;

  @override
  State<CkResizable> createState() => _CkResizableState();
}

class _CkResizableState extends State<CkResizable> {
  late double _ratio;

  @override
  void initState() {
    super.initState();
    _ratio = widget.initialRatio;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return LayoutBuilder(
      builder: (context, constraints) {
        return Row(
          children: [
            SizedBox(
              width: constraints.maxWidth * _ratio,
              child: widget.left,
            ),
            GestureDetector(
              onHorizontalDragUpdate: (details) {
                setState(() {
                  _ratio += details.delta.dx / constraints.maxWidth;
                  _ratio = _ratio.clamp(0.1, 0.9);
                });
              },
              child: MouseRegion(
                cursor: SystemMouseCursors.resizeLeftRight,
                child: Container(
                  width: 4,
                  color: borderColor,
                ),
              ),
            ),
            Expanded(
              child: widget.right,
            ),
          ],
        );
      },
    );
  }
}
