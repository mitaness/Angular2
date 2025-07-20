11:48 AM 19-Jul-25
new Date().toISOString()
'2025-07-19T09:49:45.816Z'
.split('T')[0]
[ '2025-07-19', '09:49:45.816Z' ]

https://stackoverflow.com/questions/38306363/svg-circle-cant-bind-to-cx-since-it-isnt-a-known-native-property

In order to bind to SVG element attributes in Angular, you must prefix them with attr:

For your circle this will be:

<svg height="100" width="100">
      <circle fill="white"
          [attr.cx]="parsedSize/2"
          [attr.cy]="parsedSize/2"
          [attr.r]="radius"
          [attr.stroke]="stroke"
          [attr.stroke-width]="strokeWidthCapped"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="(1 - parsedComplete) * circumference"/>
</svg>

ERROR RuntimeError: NG01203: No value accessor for form control name: 'cb3'.