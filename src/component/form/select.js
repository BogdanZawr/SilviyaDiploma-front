import React from 'react';

const Select = field => <div>
<select multiple {...field.input} type={field.type} name="genre" size="4">
<option value="Антиутопия" selected="selected">Антиутопия</option>
<option value="Детектив">Детектив</option>
<option value="Драма">Драма</option>
<option value="Исторические">Исторические</option>
<option value="Мистика">Мистика</option>
<option value="Психология">Психология</option>
<option value="Романтика">Романтика</option>
<option value="Стихи">Стихи</option>
<option value="Ужасы">Ужасы</option>
<option value="Фантастика">Фантастика</option>
<option value="Фентези">Фентези</option>
<option value="Экшн">Экшн</option>
<option value="Приключения">Приключения</option>
<option value="Комедия">Комедия</option>
<option value="Статья">Статья</option>
<option value="Другое">Другое</option>
</select>
</div>

export default Select;
