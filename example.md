---
layout: center
---

# Integration of tldraw with Slidev

---

# First slide, show TLDraw

<Tldraw class="w-216 h-5/8">
{
  "store": {
    "document:document": {
      "gridSize": 10,
      "name": "",
      "meta": {},
      "id": "document:document",
      "typeName": "document"
    },
    "page:page": {
      "meta": {},
      "id": "page:page",
      "name": "Page 1",
      "index": "a1",
      "typeName": "page"
    },
    "shape:j2DELfiEEnP4yxbgbhquJ": {
      "x": -221.40559449595128,
      "y": 133.2424140133601,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:j2DELfiEEnP4yxbgbhquJ",
      "type": "note",
      "parentId": "page:page",
      "index": "a1",
      "props": {
        "color": "black",
        "size": "m",
        "text": "Hi",
        "font": "draw",
        "align": "middle",
        "verticalAlign": "middle",
        "growY": 0,
        "fontSizeAdjustment": 22,
        "url": ""
      },
      "typeName": "shape"
    },
    "shape:ibKU-6jOlxkzaJo4KX8jH": {
      "x": 532.8699576067507,
      "y": 27.909173564474372,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:ibKU-6jOlxkzaJo4KX8jH",
      "type": "note",
      "parentId": "page:page",
      "index": "a2",
      "props": {
        "color": "blue",
        "size": "m",
        "text": "Bye",
        "font": "draw",
        "align": "middle",
        "verticalAlign": "middle",
        "growY": 0,
        "fontSizeAdjustment": 22,
        "url": ""
      },
      "typeName": "shape"
    },
    "shape:BL4JxCMov4tXJSrHrvdRO": {
      "x": -171.757033904023,
      "y": 106.9167797113837,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:BL4JxCMov4tXJSrHrvdRO",
      "type": "arrow",
      "parentId": "page:page",
      "index": "a3",
      "props": {
        "dash": "draw",
        "size": "m",
        "fill": "none",
        "color": "black",
        "labelColor": "black",
        "bend": 0,
        "start": {
          "x": 0,
          "y": 0
        },
        "end": {
          "x": 626.3531047552043,
          "y": 12.38142593961328
        },
        "arrowheadStart": "none",
        "arrowheadEnd": "arrow",
        "text": "",
        "labelPosition": 0.5,
        "font": "draw"
      },
      "typeName": "shape"
    },
    "binding:L_oy2AqbntT6GP8WaizHJ": {
      "meta": {},
      "id": "binding:L_oy2AqbntT6GP8WaizHJ",
      "type": "arrow",
      "fromId": "shape:BL4JxCMov4tXJSrHrvdRO",
      "toId": "shape:j2DELfiEEnP4yxbgbhquJ",
      "props": {
        "isPrecise": false,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.455019110597687,
          "y": 0.35497048670414844,
          "z": 1
        },
        "terminal": "start"
      },
      "typeName": "binding"
    },
    "binding:XXYcN-q2AnI26O9ga_Lg5": {
      "meta": {},
      "id": "binding:XXYcN-q2AnI26O9ga_Lg5",
      "type": "arrow",
      "fromId": "shape:BL4JxCMov4tXJSrHrvdRO",
      "toId": "shape:ibKU-6jOlxkzaJo4KX8jH",
      "props": {
        "isPrecise": false,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.7230886315494319,
          "y": 0.32823754082779544,
          "z": 1
        },
        "terminal": "end"
      },
      "typeName": "binding"
    },
    "shape:8dSUaTrysPNW5Wdqe6sp0": {
      "x": -106.66793752475559,
      "y": -64.47599441431123,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:8dSUaTrysPNW5Wdqe6sp0",
      "type": "text",
      "props": {
        "color": "black",
        "size": "m",
        "w": 78.859375,
        "text": "A text",
        "font": "draw",
        "textAlign": "start",
        "autoSize": true,
        "scale": 1.4193247168348746
      },
      "parentId": "page:page",
      "index": "a4",
      "typeName": "shape"
    },
    "shape:xQRI36InI6MOHoK8X-M8N": {
      "x": 239.0154756629579,
      "y": 523.3620069470858,
      "rotation": 4.520402762665314,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:xQRI36InI6MOHoK8X-M8N",
      "type": "geo",
      "props": {
        "w": 219.38982618971013,
        "h": 219.38982618971013,
        "geo": "star",
        "color": "yellow",
        "labelColor": "black",
        "fill": "solid",
        "dash": "draw",
        "size": "m",
        "font": "draw",
        "text": "",
        "align": "middle",
        "verticalAlign": "middle",
        "growY": 0,
        "url": ""
      },
      "parentId": "page:page",
      "index": "a5",
      "typeName": "shape"
    },
    "shape:n5nB4hGRGrhUNgmvmMOSY": {
      "x": -51.47114027475584,
      "y": 232.06905982593452,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:n5nB4hGRGrhUNgmvmMOSY",
      "type": "arrow",
      "parentId": "page:page",
      "index": "a6",
      "props": {
        "dash": "draw",
        "size": "m",
        "fill": "none",
        "color": "black",
        "labelColor": "black",
        "bend": 0,
        "start": {
          "x": 0,
          "y": 0
        },
        "end": {
          "x": 203.29758545074776,
          "y": 95.148808853611
        },
        "arrowheadStart": "none",
        "arrowheadEnd": "arrow",
        "text": "",
        "labelPosition": 0.5,
        "font": "draw"
      },
      "typeName": "shape"
    },
    "binding:FZWIObLYbSkum3AulNugr": {
      "meta": {},
      "id": "binding:FZWIObLYbSkum3AulNugr",
      "type": "arrow",
      "fromId": "shape:n5nB4hGRGrhUNgmvmMOSY",
      "toId": "shape:j2DELfiEEnP4yxbgbhquJ",
      "props": {
        "isPrecise": false,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.7463652376080324,
          "y": 0.4958665054814159,
          "z": 1
        },
        "terminal": "start"
      },
      "typeName": "binding"
    },
    "binding:AjgVM-HFvYoTO1fQwHVTo": {
      "meta": {},
      "id": "binding:AjgVM-HFvYoTO1fQwHVTo",
      "type": "arrow",
      "fromId": "shape:n5nB4hGRGrhUNgmvmMOSY",
      "toId": "shape:xQRI36InI6MOHoK8X-M8N",
      "props": {
        "isPrecise": true,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.4891377957972727,
          "y": 0.5996541953862957,
          "z": 1
        },
        "terminal": "end"
      },
      "typeName": "binding"
    },
    "shape:TnJVYA2GS2M3T8DJB_Eft": {
      "x": -30.69898159408868,
      "y": 288.3495877102058,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:TnJVYA2GS2M3T8DJB_Eft",
      "type": "arrow",
      "parentId": "page:page",
      "index": "a5V",
      "props": {
        "dash": "draw",
        "size": "m",
        "fill": "none",
        "color": "black",
        "labelColor": "black",
        "bend": 0,
        "start": {
          "x": 0,
          "y": 0
        },
        "end": {
          "x": 178.8790866496713,
          "y": 51.755156493024
        },
        "arrowheadStart": "none",
        "arrowheadEnd": "arrow",
        "text": "",
        "labelPosition": 0.5,
        "font": "draw"
      },
      "typeName": "shape"
    },
    "binding:yKfGx0V5eNzZqMZYXslo5": {
      "meta": {},
      "id": "binding:yKfGx0V5eNzZqMZYXslo5",
      "type": "arrow",
      "fromId": "shape:TnJVYA2GS2M3T8DJB_Eft",
      "toId": "shape:j2DELfiEEnP4yxbgbhquJ",
      "props": {
        "isPrecise": false,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.8195414404680429,
          "y": 0.6941316636116079,
          "z": 1
        },
        "terminal": "start"
      },
      "typeName": "binding"
    },
    "binding:JPswQWcQNEA5gMJl51r8-": {
      "meta": {},
      "id": "binding:JPswQWcQNEA5gMJl51r8-",
      "type": "arrow",
      "fromId": "shape:TnJVYA2GS2M3T8DJB_Eft",
      "toId": "shape:xQRI36InI6MOHoK8X-M8N",
      "props": {
        "isPrecise": true,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.2572188971070261,
          "y": 0.5806478329579213,
          "z": 1
        },
        "terminal": "end"
      },
      "typeName": "binding"
    }
  },
  "schema": {
    "schemaVersion": 2,
    "sequences": {
      "com.tldraw.store": 4,
      "com.tldraw.asset": 1,
      "com.tldraw.camera": 1,
      "com.tldraw.document": 2,
      "com.tldraw.instance": 25,
      "com.tldraw.instance_page_state": 5,
      "com.tldraw.page": 1,
      "com.tldraw.instance_presence": 5,
      "com.tldraw.pointer": 1,
      "com.tldraw.shape": 4,
      "com.tldraw.asset.bookmark": 2,
      "com.tldraw.asset.image": 3,
      "com.tldraw.asset.video": 3,
      "com.tldraw.shape.arrow": 4,
      "com.tldraw.shape.bookmark": 2,
      "com.tldraw.shape.draw": 1,
      "com.tldraw.shape.embed": 4,
      "com.tldraw.shape.frame": 0,
      "com.tldraw.shape.geo": 8,
      "com.tldraw.shape.group": 0,
      "com.tldraw.shape.highlight": 0,
      "com.tldraw.shape.image": 3,
      "com.tldraw.shape.line": 4,
      "com.tldraw.shape.note": 6,
      "com.tldraw.shape.text": 2,
      "com.tldraw.shape.video": 2,
      "com.tldraw.binding.arrow": 0
    }
  }
}
</Tldraw>

---

# Second slide

<div class="w-216 h-3/4 bg-blue">test</div>

---

# Third slide

Yup.

---
