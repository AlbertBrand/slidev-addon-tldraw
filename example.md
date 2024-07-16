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
    "page:YK6qommMMm3PNzmDJDFdx": {
      "meta": {},
      "id": "page:YK6qommMMm3PNzmDJDFdx",
      "name": "Page 2",
      "index": "a2",
      "typeName": "page"
    },
    "page:page": {
      "meta": {},
      "id": "page:page",
      "name": "Page 1",
      "index": "a1",
      "typeName": "page"
    },
    "shape:L6pE_9lb30WSyEmHoKudg": {
      "x": 483.18765384443304,
      "y": 220.40947105645807,
      "rotation": 5.969026041820607,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:L6pE_9lb30WSyEmHoKudg",
      "type": "geo",
      "props": {
        "w": 71.02318420083297,
        "h": 52.347681485096516,
        "geo": "check-box",
        "color": "light-green",
        "labelColor": "black",
        "fill": "solid",
        "dash": "draw",
        "size": "s",
        "font": "draw",
        "text": "",
        "align": "middle",
        "verticalAlign": "middle",
        "growY": 0,
        "url": ""
      },
      "parentId": "page:page",
      "index": "a6",
      "typeName": "shape"
    },
    "shape:cVjP6yOmAvHNN-3I9Dse8": {
      "x": 193.49400806683155,
      "y": 57.68483908391735,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:cVjP6yOmAvHNN-3I9Dse8",
      "type": "geo",
      "props": {
        "w": 432.6479187011719,
        "h": 303.66149902343756,
        "geo": "rectangle",
        "color": "light-blue",
        "labelColor": "black",
        "fill": "solid",
        "dash": "dotted",
        "size": "m",
        "font": "sans",
        "text": "Hi hello",
        "align": "middle",
        "verticalAlign": "middle",
        "growY": 0,
        "url": ""
      },
      "parentId": "page:page",
      "index": "a1",
      "typeName": "shape"
    },
    "shape:sWZ3_jtvO9fW3Ri77pi53": {
      "x": 735.784309387207,
      "y": 269.23590087890625,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:sWZ3_jtvO9fW3Ri77pi53",
      "type": "arrow",
      "parentId": "page:page",
      "index": "a2",
      "props": {
        "dash": "draw",
        "size": "m",
        "fill": "none",
        "color": "black",
        "labelColor": "black",
        "bend": 0,
        "start": {
          "x": 95.5797119140625,
          "y": -146.4234619140625
        },
        "end": {
          "x": -134.114501953125,
          "y": -34.6932373046875
        },
        "arrowheadStart": "none",
        "arrowheadEnd": "arrow",
        "text": "",
        "labelPosition": 0.5,
        "font": "draw"
      },
      "typeName": "shape"
    },
    "binding:btvNCJ2QHaQi06T5xX30z": {
      "meta": {},
      "id": "binding:btvNCJ2QHaQi06T5xX30z",
      "type": "arrow",
      "fromId": "shape:sWZ3_jtvO9fW3Ri77pi53",
      "toId": "shape:cVjP6yOmAvHNN-3I9Dse8",
      "props": {
        "isPrecise": false,
        "isExact": false,
        "normalizedAnchor": {
          "x": 0.898745454076877,
          "y": 0.4741250276771536
        },
        "terminal": "end"
      },
      "typeName": "binding"
    },
    "shape:OVI8MqKZFE1DjuNAQBnvj": {
      "x": 282.0617904663086,
      "y": 92.37803649902344,
      "rotation": 0,
      "isLocked": false,
      "opacity": 1,
      "meta": {},
      "id": "shape:OVI8MqKZFE1DjuNAQBnvj",
      "type": "text",
      "props": {
        "color": "black",
        "size": "m",
        "w": 173.8125,
        "text": "Hello there!",
        "font": "mono",
        "textAlign": "start",
        "autoSize": true,
        "scale": 1
      },
      "parentId": "page:page",
      "index": "a8",
      "typeName": "shape"
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
      "com.tldraw.shape.group": 0,
      "com.tldraw.shape.text": 2,
      "com.tldraw.shape.bookmark": 2,
      "com.tldraw.shape.draw": 1,
      "com.tldraw.shape.geo": 8,
      "com.tldraw.shape.note": 6,
      "com.tldraw.shape.line": 4,
      "com.tldraw.shape.frame": 0,
      "com.tldraw.shape.arrow": 4,
      "com.tldraw.shape.highlight": 0,
      "com.tldraw.shape.embed": 4,
      "com.tldraw.shape.image": 3,
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
