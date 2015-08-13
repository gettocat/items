# items lib
Minimalistic js library to manage items list.

### Installation
* add to you page items.css and items.js
* init library:
```js
var itms = new items();
```
* add class item to listed elements. For example:
```html
<div id='list1'>
  <div class='item' data-id='1'>item 1</div>
  <div class='item' data-id='2'>item 2</div>
  <div class='item' data-id='3'>item 3</div>
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
