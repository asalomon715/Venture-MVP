(async () => {
  const checks = [];
  const mode = new URLSearchParams(location.search).get('test') || 'personal';
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const assert = (name, condition) => { if (!condition) throw new Error(name); checks.push('PASS ' + name); };
  try {
    for (let i=0; i<100 && $('postMealBtn').disabled; i++) await pause(50);
    if (mode === 'reader') {
      await refreshGroup();
      const post = meals.find(m => m.title === '<b>Photo test bowl</b>');
      assert('second browser sees shared photo and macros', post && post.image.startsWith('data:image/jpeg;base64,') && post.macros.protein === 0 && post.macros.carbs === null);
      openRecipe(post.id);
      assert('shared photo in detail view', !$('modalImage').hidden && $('modalImage').src === post.image);
      assert('nutrition visible in detail view', $('modalMacros').textContent.includes('0') && $('modalMacros').textContent.includes('Self-reported'));
    } else {
      assert('sample feed loads', meals.filter(m => typeof m.id === 'number').length === 3);
      const canvas = document.createElement('canvas'); canvas.width=1400; canvas.height=800;
      const ctx=canvas.getContext('2d'); ctx.fillStyle='#5c8b44'; ctx.fillRect(0,0,1400,800);
      const blob=await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file=new File([blob], 'meal.png', {type:'image/png'});
      const transfer=new DataTransfer(); transfer.items.add(file); $('mealPhoto').files=transfer.files;
      await $('mealPhoto').onchange();
      assert('photo upload preview', photoData.startsWith('data:image/jpeg;base64,') && !$('photoPreview').classList.contains('hidden'));
      const preview=new Image(); preview.src=photoData; await preview.decode();
      assert('photo resized to 960 pixels', preview.naturalWidth === 960);
      $('removePhoto').click();
      assert('remove photo clears draft', !photoData && $('photoPreview').classList.contains('hidden'));
      const invalid = new DataTransfer(); invalid.items.add(new File(['bad'], 'bad.heic', {type:'image/heic'})); $('mealPhoto').files=invalid.files;
      await $('mealPhoto').onchange();
      assert('unsupported photo rejected', !photoData && $('photoStatus').textContent.includes('JPG'));
      const broken = new DataTransfer(); broken.items.add(new File(['bad'], 'bad.png', {type:'image/png'})); $('mealPhoto').files=broken.files;
      await $('mealPhoto').onchange();
      assert('corrupt photo rejected', !photoData && $('photoStatus').textContent.includes('Couldn’t read'));
      const finalTransfer=new DataTransfer(); finalTransfer.items.add(file);
      $('mealPhoto').files=finalTransfer.files; await $('mealPhoto').onchange();
      assert('replacement photo ready', photoData.startsWith('data:image/jpeg;base64,'));
      $('mealAuthor').value='Group Tester'; $('mealName').value='<b>Photo test bowl</b>'; $('mealDescription').value='Rice and vegetables';
      $('mealServing').value='1 bowl'; $('mealCalories').value='450'; $('mealProtein').value='0'; $('mealCarbs').value=''; $('mealFat').value='12.5';
      $('mealCalories').value='-1'; assert('negative macros blocked', !$('mealCalories').checkValidity()); $('mealCalories').value='450';
      await $('shareMealForm').onsubmit({preventDefault(){},target:$('shareMealForm')});
      const post=meals.find(m => m.title === '<b>Photo test bowl</b>');
      assert('photo-only post with no recipe succeeds', post && post.ingredients.length === 0 && post.instructions.length === 0);
      assert('zero and unknown macros preserved', post.macros.protein === 0 && post.macros.carbs === null);
      assert('post title is escaped', document.querySelector('.meal-card h3').textContent === '<b>Photo test bowl</b>' && !document.querySelector('.meal-card h3 b'));
      assert('nutrition on feed card', document.querySelector('.nutrition').textContent.includes('450') && !document.querySelector('.nutrition').textContent.includes('g carbs'));
      if (mode === 'personal') assert('photo and macros stored locally', JSON.parse(localStorage.getItem('platePalMeals'))[0].image === post.image);
      else assert('photo and macros stored on server', (await groupRequest('/api/meals')).meals.some(m => m.id === post.id && m.image === post.image));
      openRecipe(post.id);
      assert('empty ingredients disable grocery action', $('groceryBtn').disabled);
      $('recipeModal').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      assert('Escape closes recipe dialog', $('recipeModal').classList.contains('hidden'));
      toggleSave(post.id); document.querySelector('[data-filter="saved"]').click();
      assert('new post can be saved', document.querySelectorAll('.meal-card').length === 1);
      $('searchMeals').value='no such meal'; renderMeals(); assert('search empty state works', !!document.querySelector('.empty-state'));
      if (mode === 'personal') {
        $('mealName').value='Keep my draft'; $('mealDescription').value='Draft description';
        const original=Storage.prototype.setItem;
        Storage.prototype.setItem=function() { throw new DOMException('Quota exceeded', 'QuotaExceededError'); };
        await $('shareMealForm').onsubmit({preventDefault(){},target:$('shareMealForm')});
        Storage.prototype.setItem=original;
        assert('storage failure keeps draft and shows error', $('mealName').value==='Keep my draft' && !$('postError').classList.contains('hidden') && !meals.some(m => m.title==='Keep my draft'));
      }
    }
  } catch(error) { checks.push('FAIL ' + error.message + '\n' + error.stack); }
  window.plateTestResult = checks.join('\n');
  document.body.innerHTML = '<pre id="checks"></pre>';
  document.getElementById('checks').textContent = checks.join('\n');
})();
