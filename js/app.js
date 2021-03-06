let guideBg, postMessageWrapper;

// Buttons
let startArMessage,
  cancelTextMessage,
  postMessage,
  cancelMessage,
  navEmoticonMessage,
  undoEmoticon,
  navKakao,
  textMessageBtn,
  shareKakao,
  cancelShare,
  confirmShare;

// Nav
let navTextMessage, navWrapper;

// Text message element
let textMessage,
  textMessageWrapper,
  addTextMessage,
  displayText,
  textMessageTitle;

// Emoticon message element
let emotions, emoticonBox;

let editObject       = null,
    currentTarget    = null;
const renderItems    = [],
    commentObject    = [];
let currentZposition = 0;
const zpositionDelta = 0.1;
const newZposition   = (val) => val * -zpositionDelta;
let currentTemplate = {};
const commentTemplate = {
  id: null,
  type: null,
  content: null,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    _x: 0,
    _y: 0,
    _z: 0,
    _order: "XYZ",
  },
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
};
const dbUrl = "classes/lemona_sticker";

//******************************** AXIOS ******************************** //
// axios.defaults.baseURL = "https://browser.letsee.io:8337/parse";
// axios.defaults.headers.common["X-Parse-Application-Id"] = "awe2019wallboard";
// axios.defaults.baseURL = 'http://localhost:1337/parse';
// axios.defaults.headers.common['X-Parse-Application-Id'] = 'TEST_APP';

//******************************** KAKAO ******************************** //
// Kakao.init("3acf383e8ccdb7b906df497c249ea01b");
// const shareUrl = "http://browser.letsee.io/lemona/";
// const shareParam = "object";

/**
 * Control the length of message when typing.
 * @param e
 */
const setLength = (e) => {
  displayText.innerHTML = e.target.value;
  e.target.style.width = `${displayText.offsetWidth}px`;
};

/**
 * Reset the text message when clicks on Cancel button.
 */
const resetTextMessage = () => {
  displayText.innerText = "";
  textMessage.value = "";
  textMessage.style.width = "1em";
};

/**
 * Set current template for touch position.
 */
function setCurrentTemplate() {
  currentTemplate = { ...commentTemplate };
  touch.current.x = 0;
  touch.current.y = 0;
  touch.current.z = 0;
  touch.current.scale = 1;
  touch.current.rotation = 0;
}

/**
 * Get all comments from server.
 * @returns {Promise<unknown>}
 */
/*function getComments() {
  return new Promise((resolve, reject) => {
    axios
      .get(dbUrl, {
        params: {
          order: "createdAt",
        },
      })
      .then((data) => {
        printCommentItemsFromJson(data.data.results);
        editObject = null;
      })
      .catch((error) => {
        reject(error);
      });
  });
}*/

/**
 * Get all comments from JSON object.
 * @param data
 */
function printCommentItemsFromJson(data) {
  data.forEach((item, index) => {
    const renderableItem = createRenderable(
      item.content,
      item.position,
      item.rotation,
      item.scale
    );
    renderableItem.position.z = newZposition(currentZposition);
    currentZposition++;
    renderItems.push(renderableItem);
  });
}

/**
 * Get rotation of Object3D.
 * @param rotation
 * @returns {{_order: (*|string), _x: *, _y: *, _z: *}}
 */
function extractRotation(rotation) {
  return {
    _x: rotation._x,
    _y: rotation._y,
    _z: rotation._z,
    _order: rotation._order || "XYZ",
  };
}

/**
 * Reset comments.
 * @param status
 */
function resetComment(status = false) {

  if (!status) {
    // Remove xrelement our of Entity ( only remove the last one )
    letsee.removeXRElement(getLastChild());
  }

  if (editObject) editObject = null;
  // reviewText.val('');
  // reviewName.val('');
  setCurrentTemplate();
}

/**
 * Get the last child in the list of XRElements.
 * @returns {*}
 */
function getLastChild() {
  let xrElements = letsee.getEntityByUri("https://developer.letsee.io/api-tm/target-manager/target-uid/6051cbc99f4e4e4457a269f2").children;
  return xrElements[xrElements.length - 1];
}

/**
 * Add comments.
 * @param _type
 * @param _val
 * @param _author
 */
function addComment(_type, _val, _author = null) {
  /*setCurrentTemplate();*/
  const ele = createDom(_type, _val);
  /*ele.position.z = newZposition(currentZposition);
  currentTemplate.type = _type;
  world.add(ele);*/

  touch.current.x = 0;
  touch.current.y = 0;
}

/**
 * Show all renderable objects.
 */
/*function showCommentRenderable() {
  renderItems.forEach((obj) => {});
}*/

/**
 * Hie all renderable objects.
 */
/*function hideCommentRenderable() {
  renderItems.forEach((obj) => {});
}*/

/**
 * Validate the message form.
 * @param _reviewText
 * @param _reviewName
 * @returns {boolean[]}
 */
/*function validation(_reviewText, _reviewName) {
  let flag = [false, false];
  const textLength = _reviewText.val().length;
  const nameLength = _reviewName.val().length;

  if (!textLength) {
    // no text
    console.log("no text");
    checkValidation(_reviewText, false, "Review is mandotory field.");
    flag[0] = false;
  } else if (textLength > 15) {
    // too long
    console.log("too long text");
    checkValidation(
      _reviewText,
      false,
      "Too long review. Need lees than 15 character."
    );
    flag[0] = false;
  } else {
    checkValidation(_reviewText, true);
    flag[0] = true;
  }

  if (!nameLength) {
    checkValidation(_reviewName, false, "Name is mandotory field.");
    flag[1] = false;
  } else if (nameLength > 5) {
    checkValidation(
      _reviewName,
      false,
      "Too long name. Need lees than 5 character."
    );
    flag[1] = false;
  } else {
    checkValidation(_reviewName, true);
    flag[1] = true;
  }

  return flag;
}*/

/**
 * Check the form when users type the messages.
 * @param ele
 * @param status
 * @param text
 */
/*function checkValidation(ele, status, text = null) {
  if (status) {
    ele.removeClass("validationFailed");
    ele.siblings(".validation").html("");
    ele.siblings(".validation").hide();
  } else {
    ele.addClass("validationFailed");
    ele.siblings(".validation").html(text);
    ele.siblings(".validation").show();
  }
}*/

/**
 * Create DOM content wrapper for comments (text & emojis).
 * @param _type
 * @param _content
 * @param _author
 * @returns {string}
 */
const createDomContent = (_type, _content, _author = null) => {
  return _type === "text"
    ? `<div class="wrap"><div class="comment"><div class="value">${_content}</div></div></div>`
    : `<div class="wrap"><div class="emoji"><div class="value">${_content}</div></div></div>`;
};

/**
 * Create xrElement (text or emojis).
 * @param _content
 * @param _position
 * @param _rotation
 * @param _scale
 * @returns {*}
 */
function createRenderable(_content, _position = null, _rotation = null, _scale = null) {

  const entity = letsee.getEntityByUri('https://developer.letsee.io/api-tm/target-manager/target-uid/6051cbc99f4e4e4457a269f2');
  let xrelement = letsee.createXRElement(_content, entity);
  // letsee.bindXRElement(xrelement, entity);

  return xrelement;
}

/**
 * Create DOM renderable object and add renderable and helper class to content.
 * @param type
 * @param value
 * @param _author
 * @returns {null}
 */
function createDom(type, value, _author = null) {
  console.warn(`createDom`);

  /*// const element = document.createElement('div');
  currentTemplate.content = createDomContent(type, value, _author);
  if (!editObject) editObject = createRenderable(currentTemplate.content);
  else console.warn("editObject is already exist!");
  editObject.element.classList.add("helper");*/

  currentTemplate.content = createDomContent(type, value, _author);
  console.warn(currentTemplate.content);

  if (!editObject) {
    editObject = createRenderable(currentTemplate.content);
    editObject.element.classList.add("renderable", "helper");
  } else console.warn("editObject is already exist!");

  return editObject;
}

/**
 * Save all the changes.
 * @returns {Promise<unknown>}
 */
function saveComment() {
  return new Promise((resolve, reject) => {
    if (editObject) {
      editObject.element.classList.remove("helper");
      currentTemplate.position = { ...editObject.position };
      currentTemplate.rotation = { ...extractRotation(editObject.rotation) };
      currentTemplate.scale = { ...editObject.scale };
      commentObject.push(currentTemplate);
      resetComment(true);
      resolve();
      // postComment()
      //     .then(resolve)
      //     .catch(reject);
    } else {
      reject();
    }
  });
}

/**
 * Post comments.
 * @returns {Promise<unknown>}
 */
/*function postComment() {
  return new Promise((resolve, reject) => {
    if (currentTemplate) {
      axios
      .post(dbUrl, { comments: commentObject })
      .then((result) => {
        // renderItems.push(editObject);
        // currentZposition++;
        // resetComment(true);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
        // resetComment(true);
      });
    } else {
      reject(error);
      // resetComment(true);
    }
  });
}*/

/**
 * Send the link to share by Kakao.
 * @param objectId
 */
const sendLink = (objectId) => {
  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "????????? ????????? ????????? ?????????",
      description: "#????????? #BTS #?????????_?????????",
      imageUrl: "http://browser.letsee.io/lemona/asset/product_02.jpg",
      link: {
        mobileWebUrl: `${shareUrl}?${shareParam}=${objectId}`,
        webUrl: `${shareUrl}?${shareParam}=${objectId}`,
      },
    },
    buttons: [
      {
        title: "????????? ????????? ????????????",
        link: {
          mobileWebUrl: `${shareUrl}?${shareParam}=${objectId}`,
          webUrl: `${shareUrl}?${shareParam}=${objectId}`,
        },
      },
    ],
  });
};

/**
 * Check shared parameter
 * @returns {boolean}
 */
/*function getParameter() {
  const agent = navigator.userAgent.toLowerCase();
  const objId = new URL(window.location.href).searchParams.get(shareParam);
  if (objId) {
    if (agent.indexOf("kakao") > -1) {
      if (agent.indexOf("android") > -1) {
        location.href =
          "intent://browser.letsee.io/lemona/index.html?" +
          shareParam +
          "=" +
          objId +
          "#Intent;scheme=http;package=com.android.chrome;end";
      } else {
        window.open(
          `https://browser.letsee.io/lemona/index.html?${shareParam}=${shareObjectId}`,
          "_self"
        );
      }
      return false;
    }
    getSharedMessage(objId)
      .then((result) => {
        editObject = null;
        printCommentItemsFromJson(result.data.comments);
      })
      .catch((error) => {
        initApplication();
      });
  } else {
    initApplication();
  }
}*/

/**
 * Get shared messages.
 * @param objId
 * @returns {Promise<unknown>}
 */
/*const getSharedMessage = (objId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${dbUrl}/${objId}`)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};*/

/**
 * Init application.
 */
function initApplication() {
  guideBg.style.display = "block";
  navWrapper.style.display = "block";
}

/**
 * Post to save message.
 */
function postMessageToSave() {
  saveComment().then(() => {
    navKakao.style.display = "block";
    resetTextMessage();
    setNavScreen();
  });
}

/**
 * Cancel when save the comments or emojis.
 */
function cancelPostAction() {
  resetComment();
  resetTextMessage();
  setNavScreen();
}

/**
 * Add and save text message.
 */
function addMessage() {
  textMessageWrapper.style.display = "none";
  postMessageWrapper.style.display = "block";

  addComment("text", textMessage.value);
}

/**
 * Navigation control at the bottom right.
 */
const setNavScreen = () => {
  guideBg.style.display = "none";
  navWrapper.style.display = "block";
  navWrapper.classList.remove("backdrop");
  emotions.style.display = "none";
  textMessageWrapper.style.display = "none";
  postMessageWrapper.style.display = "none";
};

/**
 * Start AR Message.
 */
function startARMessage() {
  navKakao.style.display = "none";
  setNavScreen();
}

window.onload = () => {
  startArMessage = document.getElementById("startArMessage");
  guideBg = document.getElementById("guide-bg");
  navTextMessage = document.getElementById("navTextMessage");
  textMessage = document.getElementById("textMessage");
  navWrapper = document.getElementById("nav");
  textMessageWrapper = document.getElementById("textMessageWrapper");
  cancelTextMessage = document.getElementById("cancelTextMessage");
  addTextMessage = document.getElementById("addTextMessage");
  displayText = document.getElementById("displayText");
  postMessage = document.getElementById("postMessage");
  cancelMessage = document.getElementById("cancelMessage");
  undoEmoticon = document.getElementById("undo");
  navKakao = document.getElementById("navKakao");
  navEmoticonMessage = document.getElementById("navEmoticonMessage");
  textMessageBtn = document.getElementById("textMessageBtn");
  textMessageTitle = document.getElementById("textMessageTitle");
  emotions = document.getElementById("emotions");
  emoticonBox = document.querySelectorAll(".emoticonBox");
  postMessageWrapper = document.getElementById("postMessageWrapper");
  shareKakao = document.getElementById("shareKakao");
  cancelShare = document.getElementById("cancelShare");
  confirmShare = document.getElementById("confirmShare");

  startArMessage.addEventListener("click", startARMessage);
  postMessage.addEventListener("click", postMessageToSave);
  cancelMessage.addEventListener("click", cancelPostAction);

  // Control share action
  cancelShare.addEventListener("click", () => {
    navWrapper.style.display = "block";
    shareKakao.style.display = "none";
  });
  confirmShare.addEventListener("click", () => {
    // loader.style.display = 'block';
    postComment().then((result) => {
      console.log(result);
      sharedObjectId = result.data.objectId;
      sendLink(result.data.objectId);
      // loader.style.display = 'none';
    });
  });

  navTextMessage.addEventListener("click", () => {
    navWrapper.style.display = "none";
    textMessageWrapper.style.display = "block";
    textMessage.focus();
  });
  textMessage.addEventListener("input", setLength);
  textMessage.addEventListener("focusin", () => {
    textMessageBtn.style.display = "none";
    textMessageTitle.style.display = "none";
  });
  textMessage.addEventListener("focusout", () => {
    textMessageBtn.style.display = "block";
    textMessageTitle.style.display = "block";
  });

  cancelTextMessage.addEventListener("click", () => {
    resetTextMessage();
    setNavScreen();
  });
  addTextMessage.addEventListener("click", (e) => {
    e.preventDefault();
    addMessage();
  });

  undoEmoticon.addEventListener("click", () => {
    navWrapper.style.display = "block";
    emotions.style.display = "none";
  });

  navKakao.addEventListener("click", () => {
    navWrapper.style.display = "none";
    shareKakao.style.display = "block";
  });

  navEmoticonMessage.addEventListener("click", () => {
    navWrapper.style.display = "none";
    emotions.style.display = "block";
  });

  // Control emoji
  emoticonBox.forEach((val, index) => {
    val.addEventListener("click", (e) => {
      emotions.style.display = "none";
      postMessageWrapper.style.display = "block";
      addComment("emoji", e.currentTarget.innerHTML);
    });
  });
};
