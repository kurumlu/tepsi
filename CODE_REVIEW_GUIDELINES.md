[source](https://github.com/Skyscanner/backpack/blob/master/CODE_REVIEW_GUIDELINES.md)

# Code review guidelines

Tepsi is SD Worx design system. 
It should be an encoding of the SD Worx visual design language, patterns, and ideas.


Tepsi should be the *best* way to build and design SD Worx products UI.

## Anchoring in design

Tepsi starts with design, and all changes or additions should be previously agreed 
on in the wider design community before being implemented in Tepsi. 
In absence of having gone through design review, changes should have been reviewed and approved by a Tepsi designer.

## Quality

Tepsi is intended to reduce work when implementing SD Worx product UI and should be of high quality. 
While it's expected that implementing UI as part of Tepsi will take more time and effort than the equivalent work outside of Tepsi, 
the results empower everyone to go faster.

All changes to Tepsi should

+ Follow the Tepsi style guide.
+ Pass all linting checks.
+ Have zero warnings.
+ Expose a _delightful_ API surface.
+ Have high test coverage.
+ Match the design.
+ Support RTL.
+ Have considered accessibility and through the API encourage consumers to build accessible products. e.g. Making `accessibilityLabel` required rather than optional.
+ Support theming when appropriate.
+ Feature good examples.
+ Follow [Semantic Versioning (SemVer)](https://semver.org/), erring on the side of too many breaking changes rather than shipping something breaking as a minor or patch.
+ Have considered extreme cases such as users with larger text or smaller devices.
+ Be well documented.
+ Be closed for modification of look and feel.
+ Include an entry in `UNRELEASED.yaml` unless the change is purely internal.
