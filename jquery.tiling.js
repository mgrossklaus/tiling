(function($){

	var options = {
		minWidth	: 150,
		delay			: 0
	};

	$.fn.tiling = function(overwrite) {

		if(overwrite) {
      $.extend(options, overwrite);
    }

		return this.each(function() {

			var $this					= $(this),
					$items				= $this.find('li'),
					itemsLength		= $items.length,
					resizeTimeout,
					listData			= setListData(itemsLength);

			initArrangeList($items, listData);

			$this.find('.list').remove();

			window.addEventListener('resize', function() {

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {
					var newListData	= setListData(itemsLength);

					if(listData.numsUl !== newListData.numsUl || listData.numItemsInList !== newListData.numItemsInList) {

						initArrangeList($items, newListData);

						listData = setListData(itemsLength);
					}
				}, options.delay);
			});


			function setListData(itemsLength) {

				var numItemsInList	= calculateHowManyUlsAreNeeded(),
						numsUl					= Math.ceil(itemsLength / numItemsInList),

						listData	= {
							'numItemsInList'	: numItemsInList,
							'numsUl'					: numsUl
						};

				return listData;
			}


			function initArrangeList($items, listData) {
				
				$this.find('ul').remove();

				arrangeList($items, listData);
			}


			function arrangeList($items, listData) {

				for(i = 0; i < listData.numsUl; i++) {
					createList($items, i, listData.numItemsInList);
				}

				fillList(listData.numItemsInList);
			}


			function calculateHowManyUlsAreNeeded() {

				var windowWidth	= window.innerWidth;

				return Math.ceil(windowWidth / options.minWidth);
			}


			function returnListItems($items, i, numItemsInList) {

				var $items = $items.filter('li:lt('+ (i*numItemsInList+numItemsInList) +')').filter('li:gt('+ (i*numItemsInList) +')');

				return $items;
			}


			function fillList(numItemsInList) {

				var $last = $this.find('ul:last');

				if($last.find('li').length < numItemsInList-1) {
					$last.append($('<li>'));

					fillList(numItemsInList);
				}
			}


			function createList($items, i, numItemsInList) {

				var $currentItems	= returnListItems($items, i, numItemsInList),
						$list					= $currentItems.wrapAll('<ul></ul>').parent();

				$this.append($list);
			}

		});

	}
  
})(jQuery);