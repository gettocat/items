# items lib
Minimalistic js library to manage items list.

### Installation
* add to you page items.css and items.js
* init library:
```js
var itms = new items();
```

### Using
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

itms.getSelected(function(el) { /// this callback will be triggered on each selected item
    var id = $(el).data("id"); //for example - get id of item from data-id
    
    fake_ajax(function(resp) {//send async query
        itms2.unselect(el);//unselect item
        if (resp.status == 1)
            $(el).remove();//and remove it from list
    });

});
```
