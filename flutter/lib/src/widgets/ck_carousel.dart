import 'package:flutter/material.dart';


/// A carousel component matching the web @cookest/ui Carousel.
class CkCarousel extends StatefulWidget {
  const CkCarousel({
    super.key,
    required this.items,
    this.height = 300,
    this.viewportFraction = 0.8,
  });

  final List<Widget> items;
  final double height;
  final double viewportFraction;

  @override
  State<CkCarousel> createState() => _CkCarouselState();
}

class _CkCarouselState extends State<CkCarousel> {
  late PageController _controller;

  @override
  void initState() {
    super.initState();
    _controller = PageController(viewportFraction: widget.viewportFraction);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: widget.height,
      child: PageView.builder(
        controller: _controller,
        itemCount: widget.items.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: widget.items[index],
          );
        },
      ),
    );
  }
}
