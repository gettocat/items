# items lib
Minimalistic js library to manage items list.

### Installation
* add to you page items.css and items.js
* init library:
```js
var itms = new items();
```
* add class item to listed elements. 
* add item-header and item-footer, if this need.

For example:
```html
<div id='list1'>
  <div class="item-header">
    <a href="#" onclick="return itms.selectAll()" class="btn btn-primary">Select all</a>
    <a href="#" onclick="return itms.unselectAll()" class="btn btn-primary">Clear selection</a>
    <a href="#" onclick="itms.getSelected(function(el) { $(el).remove(); });" class="hideOnEmptySelection hide btn btn-danger">Delete selected</a>
  </div>
  <div class='item' data-id='1'>item 1</div>
  <div class='item' data-id='2'>item 2</div>
  <div class='item' data-id='3'>item 3</div>
  <div class="item-footer"></div>
</div>
```

### Methods
```js
itms.select(el); // select element
itms.unselect(el); //remove selection on element 
itms.selectAll(); //select all elements
itms.unselectAll(); //remove selection from all elements
```
### Callbacks
```js
itms.onHasSelected(function() {
  //action on one or more selected items
});

itms.onHasNoSelected(function() {
  //action on zero selected items
});

itms.onSelect(function() {
  //action on new selected item
});

itms.onUnSelect(function() {
  //action on new onselected item
});

itms.getSelected(function(el) { // this callback will be triggered on each selected item
    var id = $(el).data("id"); //for example - get id of item from data-id
    
    fake_ajax(function(resp) {//send async query
        itms2.unselect(el);//unselect item
        if (resp.status == 1)
            $(el).remove();//and remove it from list
    });

});

itms.getAllSelected(function(arr){
    //arr is Array of $(element);
});

itms.getAllSelectedAttr('id', function(arr){
    //arr is Array of value data-id of elements
});
```

### Advanced usage
If you need a more then one list on page, use this code:
```js
var itm11 = new items("#tags");//#tag its a selector, where search elements of this list, by default - document.
var itms2 = new items("#categoryes");
```

### Constructor params
```js
var itm1 = new items("#tags", {
  scope: "Selected items: ",//text of footer items. 
  item_selector: '.item',//selector of one item
  active_item_class: 'item-selected', //class, adding to selected item
  header_selector: ".item-header",//list header selector
  footer_selector: ".item-footer",//list footer selector
});
```
