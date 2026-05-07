import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Avatar size matching the React Avatar component.
enum CkAvatarSize { xs, sm, md, lg, xl }

/// An avatar component matching the web @cookest/ui Avatar.
class CkAvatar extends StatelessWidget {
  const CkAvatar({
    super.key,
    this.imageUrl,
    required this.alt,
    this.initials,
    this.size = CkAvatarSize.md,
  });

  final String? imageUrl;
  final String alt;
  final String? initials;
  final CkAvatarSize size;

  double get _dimension {
    switch (size) {
      case CkAvatarSize.xs:
        return 24;
      case CkAvatarSize.sm:
        return 32;
      case CkAvatarSize.md:
        return 40;
      case CkAvatarSize.lg:
        return 48;
      case CkAvatarSize.xl:
        return 64;
    }
  }

  double get _fontSize {
    switch (size) {
      case CkAvatarSize.xs:
        return 10;
      case CkAvatarSize.sm:
        return CookestTokens.fontSizeXs;
      case CkAvatarSize.md:
        return CookestTokens.fontSizeSm;
      case CkAvatarSize.lg:
        return CookestTokens.fontSizeBase;
      case CkAvatarSize.xl:
        return CookestTokens.fontSizeLg;
    }
  }

  String get _displayInitials {
    if (initials != null) return initials!;
    return alt
        .split(' ')
        .where((s) => s.isNotEmpty)
        .take(2)
        .map((s) => s[0])
        .join()
        .toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final ringColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;

    return Container(
      width: _dimension,
      height: _dimension,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: ringColor, width: 2),
      ),
      child: ClipOval(
        child: imageUrl != null
            ? Image.network(
                imageUrl!,
                width: _dimension,
                height: _dimension,
                fit: BoxFit.cover,
                semanticLabel: alt,
                errorBuilder: (_, __, ___) => _initialsWidget(),
              )
            : _initialsWidget(),
      ),
    );
  }

  Widget _initialsWidget() {
    return Container(
      color: CookestTokens.colorPrimaryDEFAULT,
      alignment: Alignment.center,
      child: Text(
        _displayInitials,
        style: GoogleFonts.inter(
          fontSize: _fontSize,
          fontWeight: CookestTokens.fontWeightSemibold,
          color: CookestTokens.colorWhite,
        ),
      ),
    );
  }
}

/// Avatar group with overlap — matches React AvatarGroup.
class CkAvatarGroup extends StatelessWidget {
  const CkAvatarGroup({
    super.key,
    required this.children,
    this.max,
  });

  final List<CkAvatar> children;
  final int? max;

  @override
  Widget build(BuildContext context) {
    final visible = max != null ? children.take(max!).toList() : children;
    final overflow = max != null ? children.length - max! : 0;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < visible.length; i++)
          Transform.translate(
            offset: Offset(-8.0 * i, 0),
            child: visible[i],
          ),
        if (overflow > 0)
          Transform.translate(
            offset: Offset(-8.0 * visible.length, 0),
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Theme.of(context).brightness == Brightness.dark
                    ? CookestTokens.colorCardDark
                    : CookestTokens.colorCardLight,
                border: Border.all(
                  color: Theme.of(context).brightness == Brightness.dark
                      ? CookestTokens.colorSurfaceDark
                      : CookestTokens.colorSurfaceLight,
                  width: 2,
                ),
              ),
              alignment: Alignment.center,
              child: Text(
                '+$overflow',
                style: GoogleFonts.inter(
                  fontSize: CookestTokens.fontSizeSm,
                  fontWeight: CookestTokens.fontWeightSemibold,
                  color: Theme.of(context).brightness == Brightness.dark
                      ? CookestTokens.colorHeadingDark
                      : CookestTokens.colorHeadingLight,
                ),
              ),
            ),
          ),
      ],
    );
  }
}
