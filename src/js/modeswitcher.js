var ContextMenu = require('./ContextMenu');
var i18next = require('./i18next-1.10.1');

/**
 * Create a select box to be used in the editor menu's, which allows to switch mode
 * @param {Object} editor
 * @param {String[]} modes  Available modes: 'code', 'form', 'text', 'tree', 'view'
 * @param {String} current  Available modes: 'code', 'form', 'text', 'tree', 'view'
 * @returns {HTMLElement} box
 */
function createModeSwitcher(editor, modes, current) {
  // TODO: decouple mode switcher from editor
  //i18next.init({ resStore: resources.locales });
   /**
   * Switch the mode of the editor
   * @param {String} mode
   */
  function switchMode(mode) {
    // switch mode
    editor.setMode(mode);

    // restore focus on mode box
    var modeBox = editor.dom && editor.dom.modeBox;
    if (modeBox) {
      modeBox.focus();
    }
  }

  // available modes
  var availableModes = {
    code: {
      //'text': 'Code',
	  'text' : i18next.t('code'),
      'title': i18next.t('code_title'),
      'click': function () {
        switchMode('code')
      }
    },
    form: {
      //'text': 'Form',
	  'text' : i18next.t('form'),
      'title': i18next.t('form_title'),
      'click': function () {
        switchMode('form');
      }
    },
    text: {
      //'text': 'Text',
	  'text' : i18next.t('text'),
      'title': i18next.t('text_title'),
      'click': function () {
        switchMode('text');
      }
    },
    tree: {
      //'text': 'Tree',
	  'text' : i18next.t('tree'),
      'title': i18next.t('tree_title'),
      'click': function () {
        switchMode('tree');
      }
    },
    view: {
      //'text': 'View',
	  'text' : i18next.t('view'),
      'title': i18next.t('view_title'),
      'click': function () {
        switchMode('view');
      }
    }
  };

  // list the selected modes
  var items = [];
  for (var i = 0; i < modes.length; i++) {
    var mode = modes[i];
    var item = availableModes[mode];
    if (!item) {
      throw new Error('Unknown mode "' + mode + '"');
    }

    item.className = 'type-modes' + ((current == mode) ? ' selected' : '');
    items.push(item);
  }

  // retrieve the title of current mode
  var currentMode = availableModes[current];
  if (!currentMode) {
    throw new Error('Unknown mode "' + current + '"');
  }
  var currentTitle = currentMode.text;

  // create the html element
  var box = document.createElement('button');
  box.className = 'modes separator';
  box.innerHTML = currentTitle + ' &#x25BE;';
  box.title = i18next.t('box_title');
  box.onclick = function () {
    var menu = new ContextMenu(items);
    menu.show(box);
  };

  return box;
}

exports.create = createModeSwitcher;
