'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };
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
    optAuthorsListSelector = '.authors.list',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function (customSelector = ''){
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
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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
      //console.log(tag + ' is used ' + tags[tag] + ' times');
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
  const generateTags = function (){
    
    const optArticleTagsSelector = '.post-tags .list';
    const optTagsListSelector = '.tags.list';
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
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
        const linkHTMLData = {id: tag, title: tag,};
        const linkHTML = templates.tagLink(linkHTMLData);
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
    //console.log('tagsParams:', tagsParams);

    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') </li> ';
      //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      //console.log('tagLinkHTML:', tagLinkHTML);

      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="tag-size-' + tagLinkHTML + '">' + tag  + '</a></li> ';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

    
  };
    
  
  generateTags();

  const tagClickHandler = function (event){
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
   
  };
  
  const addClickListenersToTags = function (){
    /* find all links to tags */
    const links = document.querySelectorAll('.list-tags a');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
    
  };
  
  addClickListenersToTags();


  const generateAuthors = function(){
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorWraper = article.querySelector(optArticleAuthorSelector);
      //let html ='';
      const author = article.getAttribute('data-author');
      const linkHTMLData = {id: author, title: author};
      const linkHTML = templates.authorLink(linkHTMLData);
      //html = html +  linkHTML;
      if(!allAuthors[author]){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      authorWraper.innerHTML = linkHTML;
    }
    const authorList = document.querySelector(optAuthorsListSelector);
    //authorList.innerHTML = allAuthors.join(' ');
    const allAuthorsData = {authors : []};
    for(let articleAuthor in allAuthors){
      allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor],
      });
    }
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    
  };
  generateAuthors ();
  
  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#','');
    const activeLinks = document.querySelectorAll('.list-authors a.active');
    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    const allAuthorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLinkHref of allAuthorLinksHref) {
      authorLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };
  
  const addClickListenersToAuthors = function (){
    const links = document.querySelectorAll('.list-authors a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}