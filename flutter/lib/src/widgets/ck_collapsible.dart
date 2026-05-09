import 'package:flutter/material.dart';

/// A collapsible component matching the web @cookest/ui Collapsible.
class CkCollapsible extends StatefulWidget {
  const CkCollapsible({
    super.key,
    required this.isOpen,
    required this.child,
  });

  final bool isOpen;
  final Widget child;

  @override
  State<CkCollapsible> createState() => _CkCollapsibleState();
}

class _CkCollapsibleState extends State<CkCollapsible> with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return AnimatedSize(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      alignment: Alignment.topCenter,
      child: widget.isOpen
          ? widget.child
          : const SizedBox(width: double.infinity, height: 0),
    );
  }
}
