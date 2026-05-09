import 'package:flutter/material.dart';

/// An aspect ratio component matching the web @cookest/ui AspectRatio.
class CkAspectRatio extends StatelessWidget {
  const CkAspectRatio({
    super.key,
    required this.ratio,
    required this.child,
  });

  final double ratio;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: ratio,
      child: child,
    );
  }
}
