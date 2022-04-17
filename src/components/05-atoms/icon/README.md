# Icon

#### How to add a new icon

Follow these steps:

1. Make sure the designer has added the icon in the [Figma library](https://www.figma.com/file/d3S8XD5WMrukNZQwFEWY9T/Library?node-id=2069%3A6503)
2. Go to the correct icon in the **Atoms/Icon/Large** icon set (all added icons must be 24x24)
3. Select the figma component, make sure to select the component, which is 24px by 24px and includes the bounding box of the icon, and not just the icon
4. Right click on the component and select "Copy as SVG"
5. Create a new file with the component name inside the raw icons directory: `src/components/00-helpers/icons/raw` 
for example: `src/components/00-helpers/icons/raw/star.svg` and paste the contents from figma inside this file
6. Run the `yarn generate-icon-exports` command. This will generate all the icon exports and IconNames (Uppercase and with _) from inside the raw directory
7. The icon is automatically added to the storybook and ready to use
8. Done!