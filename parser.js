var stack = [];
var parsed = [];
function MyDOMParser(root) {
    var level = 1;
    var id = 1;
    var parentid = 1;

    if (root.nodeType == 1) {
        computed = window.getComputedStyle(root,null);
        var computed_css = [];

        for (var k = 0; k < computed.length; k++) {
            computed_css.push(computed[k] + ':' + computed[computed[k]]);
        }

        root_elem = {'parentid': parentid, 'id': id, 'level': level, 'node': root, 'computedstyle': computed_css};
        elem_to_push = {'parentid': parentid, 'id': id, 'level': level, 'node': root.outerHTML, 'computedstyle': computed_css};

        stack.push(root_elem);
        parsed.push(elem_to_push);

        while(stack.length != 0){
            elem = stack.pop();

            for (var i = 0; i < elem.node.children.length; i++) {
                elem_computed = window.getComputedStyle(elem.node.children[i],null);
                var elem_computed_css = [];

                for (var m = 0; m < elem_computed.length; m++) {
                    elem_computed_css.push(elem_computed[m] + ':' + elem_computed[elem_computed[m]]);
                }

                s_elem = {'parentid': elem.id, 'id': ++id, 'level': elem.level+1 , 'node': elem.node.children[i], 'computedstyle': elem_computed_css};
                s_elem_to_push = {'parentid': elem.id, 'id': id, 'level': elem.level+1 , 'node': elem.node.children[i].outerHTML, 'computedstyle': elem_computed_css};

                stack.push(s_elem);
                parsed.push(s_elem_to_push);
            }
        }
    }
}

MyDOMParser(document.children[0]);
return parsed;
