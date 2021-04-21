## getPosition

Gets the position of an overlay relative to an element/region.

It has the following signature:
- constrainTo: Region|Node|String|Bool - region in which the region should fit relative to the target, defaults to `true`
- targetNode: Node - element to which the overlay should align to
- overlayNode: Node - element which should align to target
- offset: Number|Number[]|{ x: Number, y: Number }[] - set distance from target, defaults to 10. The offset is ajusted for each position. defaults to `0`.
- relativeToViewport: Bool - whether overlay should use `fixed` position, defaults to `true`. If `false` it will use absolute position, defaults to `true`.
- arrowSize: Number - width and height of the arrow, defaults to `10`
- positions: String|String[] - specify position of the overlay. If an array of positions are provided, the overlay will try them one by one to check if it fits in constrainTo (by default in viewport), defaults to the `posible values in order`

**Posible substring values are:**
- tc - top center
- tl - top left
- tr - top right
- rc - right center
- bc - bottom center
- br - bottom right
- bl - bottom left
- lc - left

There are 4 common predefined aliases for this positions:
top, left, right, bottom.

Posible values are:

top
- bc-tc - top
- bl-tl - top aligned left
- br-tr - top aligned right
- br-tl - top left

right
- lc-rc - right
- tl-tr - right aligned top
- bl-br - right aligned bottom
- tl-br - bottom right

bottom
- tc-bc - bottom
- tl-bl - bottom aligned left
- tr-br - bottom aligned right
- tr-bl - bottom left

left
- rc-lc - left
- tr-tl - left aligned top
- br-bl - left aligned bottom
