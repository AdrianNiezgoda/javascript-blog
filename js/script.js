'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
  
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optArticleAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
 
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html ='';

    for(let article of articles){
    
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* create HTML of the link */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
  
      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function (tags){
    const params = {'max': 0, 'min': 999999};

    for (let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  };
  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix,
    classNumber;
  };
  function generateTags(){
    
    const optArticleTagsSelector = '.post-tags .list';
    const optTagsListSelector = '.tags.list';
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll('article');
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html +linkHTML+'';
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
      }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
    /* END LOOP: for every article: */
    } 
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags); 
    console.log('tagsParams:', tagsParams);

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') </li> ';
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += '<li><a href="#tag-' + tag + '" class="tag-size-' + tagLinkHTML + '">' + tag  + '</a>'+ ' (' + allTags[tag] + ')</li> ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

    
  }
    
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLinkHref of allTagLinksHref) {
      /* add class active */
      tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
   
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('.list-tags a');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
    
  }
  
  addClickListenersToTags();


  function generateAuthors (){
    const articles = document.querySelectorAll('article');
    for(let article of articles){
      const authorWraper = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');
      //console.log(articleAuthor);
      const linkHTML = '<li><a href="#' + author + '">' + author + '</a></li>';
      authorWraper.innerHTML = linkHTML;
    }
    
  }
  generateAuthors ();
  
  function addClickListenersToAuthors(){
    const links = document.querySelectorAll('.post-author a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#','');
    const activeLinks = document.querySelectorAll('a.active[href^="#-"]');
    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    const allAuthorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLinkHref of allAuthorLinksHref) {
      authorLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
}