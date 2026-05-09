import 'package:flutter/material.dart';


/// A scroll area component matching the web @cookest/ui ScrollArea.
class CkScrollArea extends StatelessWidget {
  const CkScrollArea({
    super.key,
    required this.child,
    this.orientation = Axis.vertical,
  });

  final Widget child;
  final Axis orientation;

  @override
  Widget build(BuildContext context) {
    return Scrollbar(
      thumbVisibility: true,
      trackVisibility: false,
      thickness: 6,
      radius: const Radius.circular(3),
      child: SingleChildScrollView(
        scrollDirection: orientation,
        physics: const BouncingScrollPhysics(),
        child: Padding(
          padding: const EdgeInsets.only(right: 8), // Room for scrollbar
          child: child,
        ),
      ),
    );
  }
}
