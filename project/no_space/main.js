(function(){
    var DISPLAYING_RESULT = "display-result";

    var editing_enabled = true;
    var main_element = document.getElementsByTagName("main")[0];

    function SelectText(element) {
        // from http://stackoverflow.com/a/987376/3164117
        // jshint ignore:start
        var doc = document
            , text = element
            , range, selection
        ;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        // jshint ignore:end
    }

    function remove_padding_and_margins(input_html){
        console.log("remove_padding_and_margins");
        var temp_node = document.createElement("div");
        temp_node.innerHTML = input_html;

        var walker = document.createTreeWalker(temp_node,
            NodeFilter.SHOW_ELEMENT,
            {acceptNode: function element_filter(element){
                return element.nodeName === "P";
            }},
            false
        );

        while(walker.nextNode()){
            var node = walker.currentNode;

            node.style.padding = 0;
            node.style.margin = 0;
            node.setAttribute("data-mce-style", node.style.cssText);
        }
        return temp_node.innerHTML;
    }

    function display_result(){
        var textbox = document.getElementById("textbox");
        textbox.innerHTML = remove_padding_and_margins(textbox.innerHTML);
        SelectText(textbox);

        editing_enabled = false;
        document.body.classList.add(DISPLAYING_RESULT);
    }

    function initialize_textbox(){
        var backup = document.getElementById("textbox-backup");
        var current = document.getElementById("textbox");

        // remove the current textbox
        if(current) current.remove();
        // create a new textbox with the default content
        current = backup.cloneNode(true);
        current.id = "textbox";
        // put the new one in the document
        main_element.appendChild(current);

        // on click: if editing clear
        current.addEventListener("click", function(){
            if(editing_enabled){
                current.innerHTML = "";
            }
        });

        // on paste clear the text editor
        current.addEventListener("paste", function(){
            if(editing_enabled){
                current.innerHTML = "";
            }
        });
    }

    function reset(){
        editing_enabled = true;
        initialize_textbox();
        document.body.classList.remove(DISPLAYING_RESULT);
    }

    (function main(){
        initialize_textbox();

        document.getElementById("reset").addEventListener("click", reset);
        document.getElementById("display-result").addEventListener("click", display_result);
    })();
})();
