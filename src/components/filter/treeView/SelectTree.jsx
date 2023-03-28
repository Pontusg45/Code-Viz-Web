import { FormControl, FormControlLabel, FormHelperText, Switch, TextField } from '@mui/material';
import { DefaultOption, FreeSoloNode, getDefaultOptionProps, TreeSelect } from 'mui-tree-select';
import React, { useState } from 'react';

const sampleData = [
  {
    id: '0',
    name: 'World',
    emoji: '🌍',
    states: [
      {
        id: '1',
        name: 'Afghanistan',
        emoji: '🇦🇫',
        states: [
          {
            id: '1-3901',
            name: 'Badakhshan',
            cities: [
              { id: '1-3901-52', name: 'Ashkāsham' },
              { id: '1-3901-68', name: 'Fayzabad' },
              { id: '1-3901-78', name: 'Jurm' },
              { id: '1-3901-84', name: 'Khandūd' },
              { id: '1-3901-115', name: 'Rāghistān' },
              { id: '1-3901-131', name: 'Wākhān' }
            ]
          },
          {
            id: '1-3871',
            name: 'Badghis',
            cities: [
              { id: '1-3871-72', name: 'Ghormach' },
              { id: '1-3871-108', name: 'Qala i Naw' }
            ]
          },
          {
            id: '1-3875',
            name: 'Baghlan',
            cities: [
              { id: '1-3875-54', name: 'Baghlān' },
              { id: '1-3875-140', name: 'Ḩukūmatī Dahanah-ye Ghōrī' },
              { id: '1-3875-101', name: 'Nahrīn' },
              { id: '1-3875-105', name: 'Pul-e Khumrī' }
            ]
          },
          {
            id: '1-3884',
            name: 'Balkh',
            cities: [
              { id: '1-3884-55', name: 'Balkh' },
              { id: '1-3884-65', name: 'Dowlatābād' },
              { id: '1-3884-85', name: 'Khulm' },
              { id: '1-3884-91', name: 'Lab-Sar' },
              { id: '1-3884-97', name: 'Mazār-e Sharīf' },
              { id: '1-3884-112', name: 'Qarchī Gak' }
            ]
          },
          {
            id: '1-3872',
            name: 'Bamyan',
            cities: [
              { id: '1-3872-57', name: 'Bāmyān' },
              { id: '1-3872-104', name: 'Panjāb' }
            ]
          },
          {
            id: '1-3892',
            name: 'Daykundi',
            cities: [{ id: '1-3892-102', name: 'Nīlī' }]
          },
          {
            id: '1-3899',
            name: 'Farah',
            cities: [{ id: '1-3899-66', name: 'Farah' }]
          },
          {
            id: '1-3889',
            name: 'Faryab',
            cities: [
              { id: '1-3889-50', name: 'Andkhoy' },
              { id: '1-3889-96', name: 'Maymana' }
            ]
          },
          {
            id: '1-3870',
            name: 'Ghazni',
            cities: [{ id: '1-3870-71', name: 'Ghazni' }]
          },
          {
            id: '1-3888',
            name: 'Ghōr',
            cities: [
              { id: '1-3888-67', name: 'Fayrōz Kōh' },
              { id: '1-3888-121', name: 'Shahrak' }
            ]
          },
          {
            id: '1-3873',
            name: 'Helmand',
            cities: [
              { id: '1-3873-141', name: '‘Alāqahdārī Dīshū' },
              { id: '1-3873-70', name: 'Gereshk' },
              { id: '1-3873-93', name: 'Lashkar Gāh' },
              { id: '1-3873-95', name: 'Markaz-e Ḩukūmat-e Darwēshān' },
              { id: '1-3873-118', name: 'Sangīn' }
            ]
          },
          {
            id: '1-3887',
            name: 'Herat',
            cities: [
              { id: '1-3887-60', name: 'Chahār Burj' },
              { id: '1-3887-73', name: 'Ghōriyān' },
              { id: '1-3887-74', name: 'Herāt' },
              { id: '1-3887-80', name: 'Kafir Qala' },
              { id: '1-3887-82', name: 'Karukh' },
              { id: '1-3887-88', name: 'Kuhsān' },
              { id: '1-3887-90', name: 'Kushk' },
              { id: '1-3887-111', name: 'Qarah Bāgh' },
              { id: '1-3887-123', name: 'Shīnḏanḏ' },
              { id: '1-3887-129', name: 'Tīr Pul' },
              { id: '1-3887-135', name: 'Zindah Jān' }
            ]
          },
          {
            id: '1-3886',
            name: 'Jowzjan',
            cities: [
              { id: '1-3886-136', name: 'Āqchah' },
              { id: '1-3886-63', name: 'Darzāb' },
              { id: '1-3886-113', name: 'Qarqīn' },
              { id: '1-3886-122', name: 'Shibirghān' }
            ]
          },
          {
            id: '1-3902',
            name: 'Kabul',
            cities: [
              { id: '1-3902-79', name: 'Kabul' },
              { id: '1-3902-99', name: 'Mīr Bachah Kōṯ' },
              { id: '1-3902-103', name: 'Paghmān' }
            ]
          },
          {
            id: '1-3890',
            name: 'Kandahar',
            cities: [{ id: '1-3890-81', name: 'Kandahār' }]
          },
          {
            id: '1-3879',
            name: 'Kapisa',
            cities: [{ id: '1-3879-124', name: 'Sidqābād' }]
          },
          {
            id: '1-3878',
            name: 'Khost',
            cities: [{ id: '1-3878-87', name: 'Khōst' }]
          },
          {
            id: '1-3876',
            name: 'Kunar',
            cities: [
              { id: '1-3876-51', name: 'Asadabad' },
              { id: '1-3876-138', name: 'Āsmār' }
            ]
          },
          {
            id: '1-3900',
            name: 'Kunduz Province',
            cities: [
              { id: '1-3900-64', name: 'Dasht-e Archī' },
              { id: '1-3900-75', name: 'Imām Şāḩib' },
              { id: '1-3900-83', name: 'Khanabad' },
              { id: '1-3900-89', name: 'Kunduz' },
              { id: '1-3900-114', name: 'Qarāwul' }
            ]
          },
          {
            id: '1-3891',
            name: 'Laghman',
            cities: [{ id: '1-3891-98', name: 'Mehtar Lām' }]
          },
          {
            id: '1-3897',
            name: 'Logar',
            cities: [
              { id: '1-3897-56', name: 'Baraki Barak' },
              { id: '1-3897-139', name: 'Ḩukūmatī Azrah' },
              { id: '1-3897-106', name: 'Pul-e ‘Alam' }
            ]
          },
          {
            id: '1-3882',
            name: 'Nangarhar',
            cities: [
              { id: '1-3882-58', name: 'Bāsawul' },
              { id: '1-3882-77', name: 'Jalālābād' },
              { id: '1-3882-94', name: 'Markaz-e Woluswalī-ye Āchīn' }
            ]
          },
          {
            id: '1-3896',
            name: 'Nimruz',
            cities: [
              { id: '1-3896-86', name: 'Khāsh' },
              { id: '1-3896-100', name: 'Mīrābād' },
              { id: '1-3896-116', name: 'Rūdbār' },
              { id: '1-3896-132', name: 'Zaranj' }
            ]
          },
          {
            id: '1-3880',
            name: 'Nuristan',
            cities: [{ id: '1-3880-107', name: 'Pārūn' }]
          },
          {
            id: '1-3894',
            name: 'Paktia',
            cities: [{ id: '1-3894-69', name: 'Gardez' }]
          },
          {
            id: '1-3877',
            name: 'Paktika',
            cities: [
              { id: '1-3877-120', name: 'Saṟōbī' },
              { id: '1-3877-134', name: 'Zaṟah Sharan' },
              { id: '1-3877-133', name: 'Zarghūn Shahr' }
            ]
          },
          {
            id: '1-3881',
            name: 'Panjshir',
            cities: [{ id: '1-3881-59', name: 'Bāzārak' }]
          },
          {
            id: '1-3895',
            name: 'Parwan',
            cities: [
              { id: '1-3895-61', name: 'Charikar' },
              { id: '1-3895-76', name: 'Jabal os Saraj' }
            ]
          },
          {
            id: '1-3883',
            name: 'Samangan',
            cities: [{ id: '1-3883-53', name: 'Aībak' }]
          },
          {
            id: '1-3885',
            name: 'Sar-e Pol',
            cities: [
              { id: '1-3885-62', name: 'Chīras' },
              { id: '1-3885-92', name: 'Larkird' },
              { id: '1-3885-110', name: 'Qal‘ah-ye Shahr' },
              { id: '1-3885-117', name: 'Sang-e Chārak' },
              { id: '1-3885-119', name: 'Sar-e Pul' },
              { id: '1-3885-125', name: 'Tagāw-Bāy' },
              { id: '1-3885-128', name: 'Tukzār' }
            ]
          },
          {
            id: '1-3893',
            name: 'Takhar',
            cities: [
              { id: '1-3893-137', name: 'Ārt Khwājah' },
              { id: '1-3893-126', name: 'Taloqan' }
            ]
          },
          {
            id: '1-3898',
            name: 'Urozgan',
            cities: [
              { id: '1-3898-127', name: 'Tarinkot' },
              { id: '1-3898-130', name: 'Uruzgān' }
            ]
          },
          {
            id: '1-3874',
            name: 'Zabul',
            cities: [{ id: '1-3874-109', name: 'Qalāt' }]
          }
        ]
      },
      { id: '2', name: 'Aland Islands', emoji: '🇦🇽', states: [] },
      {
        id: '3',
        name: 'Albania',
        emoji: '🇦🇱',
        states: [
          { id: '3-603', name: 'Berat County', cities: [] },
          {
            id: '3-629',
            name: 'Berat District',
            cities: [
              { id: '3-629-153', name: 'Banaj' },
              { id: '3-629-154', name: 'Bashkia Berat' },
              { id: '3-629-170', name: 'Bashkia Kuçovë' },
              { id: '3-629-180', name: 'Bashkia Poliçan' },
              { id: '3-629-186', name: 'Bashkia Skrapar' },
              { id: '3-629-191', name: 'Berat' },
              { id: '3-629-280', name: 'Çorovodë' },
              { id: '3-629-219', name: 'Kuçovë' },
              { id: '3-629-238', name: 'Poliçan' },
              { id: '3-629-242', name: 'Rrethi i Beratit' },
              { id: '3-629-253', name: 'Rrethi i Kuçovës' },
              { id: '3-629-258', name: 'Rrethi i Skraparit' },
              { id: '3-629-273', name: 'Ura Vajgurore' }
            ]
          },
          { id: '3-607', name: 'Bulqizë District', cities: [] },
          { id: '3-618', name: 'Delvinë District', cities: [] },
          { id: '3-608', name: 'Devoll District', cities: [] },
          {
            id: '3-610',
            name: 'Dibër County',
            cities: [
              { id: '3-610-155', name: 'Bashkia Bulqizë' },
              { id: '3-610-165', name: 'Bashkia Klos' },
              { id: '3-610-176', name: 'Bashkia Mat' },
              { id: '3-610-193', name: 'Bulqizë' },
              { id: '3-610-194', name: 'Burrel' },
              { id: '3-610-209', name: 'Klos' },
              { id: '3-610-236', name: 'Peshkopi' },
              { id: '3-610-243', name: 'Rrethi i Bulqizës' },
              { id: '3-610-246', name: 'Rrethi i Dibrës' },
              { id: '3-610-256', name: 'Rrethi i Matit' },
              { id: '3-610-272', name: 'Ulëz' }
            ]
          },
          { id: '3-605', name: 'Dibër District', cities: [] },
          { id: '3-632', name: 'Durrës County', cities: [] },
          {
            id: '3-639',
            name: 'Durrës District',
            cities: [
              { id: '3-639-159', name: 'Bashkia Durrës' },
              { id: '3-639-168', name: 'Bashkia Krujë' },
              { id: '3-639-185', name: 'Bashkia Shijak' },
              { id: '3-639-197', name: 'Durrës' },
              { id: '3-639-198', name: 'Durrës District' },
              { id: '3-639-203', name: 'Fushë-Krujë' },
              { id: '3-639-214', name: 'Krujë' },
              { id: '3-639-250', name: 'Rrethi i Krujës' },
              { id: '3-639-265', name: 'Shijak' },
              { id: '3-639-269', name: 'Sukth' }
            ]
          },
          { id: '3-598', name: 'Elbasan County', cities: [] },
          {
            id: '3-631',
            name: 'Fier County',
            cities: [
              { id: '3-631-152', name: 'Ballsh' },
              { id: '3-631-157', name: 'Bashkia Divjakë' },
              { id: '3-631-160', name: 'Bashkia Fier' },
              { id: '3-631-174', name: 'Bashkia Mallakastër' },
              { id: '3-631-179', name: 'Bashkia Patos' },
              { id: '3-631-196', name: 'Divjakë' },
              { id: '3-631-200', name: 'Fier' },
              { id: '3-631-201', name: 'Fier-Çifçi' },
              { id: '3-631-227', name: 'Lushnjë' },
              { id: '3-631-234', name: 'Patos' },
              { id: '3-631-235', name: 'Patos Fshat' },
              { id: '3-631-241', name: 'Roskovec' },
              { id: '3-631-254', name: 'Rrethi i Mallakastrës' }
            ]
          },
          { id: '3-627', name: 'Fier District', cities: [] },
          { id: '3-604', name: 'Gjirokastër County', cities: [] },
          {
            id: '3-621',
            name: 'Gjirokastër District',
            cities: [
              { id: '3-621-158', name: 'Bashkia Dropull' },
              { id: '3-621-164', name: 'Bashkia Kelcyrë' },
              { id: '3-621-172', name: 'Bashkia Libohovë' },
              { id: '3-621-177', name: 'Bashkia Memaliaj' },
              { id: '3-621-183', name: 'Bashkia Përmet' },
              { id: '3-621-187', name: 'Bashkia Tepelenë' },
              { id: '3-621-204', name: 'Gjinkar' },
              { id: '3-621-205', name: 'Gjirokastër' },
              { id: '3-621-220', name: 'Këlcyrë' },
              { id: '3-621-221', name: 'Lazarat' },
              { id: '3-621-225', name: 'Libohovë' },
              { id: '3-621-231', name: 'Memaliaj' },
              { id: '3-621-240', name: 'Përmet' },
              { id: '3-621-270', name: 'Tepelenë' }
            ]
          },
          { id: '3-617', name: 'Gramsh District', cities: [] },
          { id: '3-600', name: 'Has District', cities: [] },
          { id: '3-594', name: 'Kavajë District', cities: [] },
          { id: '3-628', name: 'Kolonjë District', cities: [] },
          {
            id: '3-630',
            name: 'Korçë County',
            cities: [
              { id: '3-630-156', name: 'Bashkia Devoll' },
              { id: '3-630-166', name: 'Bashkia Kolonjë' },
              { id: '3-630-173', name: 'Bashkia Maliq' },
              { id: '3-630-182', name: 'Bashkia Pustec' },
              { id: '3-630-192', name: 'Bilisht' },
              { id: '3-630-199', name: 'Ersekë' },
              { id: '3-630-212', name: 'Korçë' },
              { id: '3-630-223', name: 'Leskovik' },
              { id: '3-630-226', name: 'Libonik' },
              { id: '3-630-228', name: 'Maliq' },
              { id: '3-630-230', name: 'Mborje' },
              { id: '3-630-237', name: 'Pogradec' },
              { id: '3-630-245', name: 'Rrethi i Devollit' },
              { id: '3-630-249', name: 'Rrethi i Kolonjës' },
              { id: '3-630-275', name: 'Velçan' },
              { id: '3-630-278', name: 'Voskopojë' }
            ]
          },
          { id: '3-597', name: 'Korçë District', cities: [] },
          { id: '3-614', name: 'Krujë District', cities: [] },
          { id: '3-612', name: 'Kuçovë District', cities: [] },
          { id: '3-601', name: 'Kukës County', cities: [] },
          {
            id: '3-623',
            name: 'Kukës District',
            cities: [
              { id: '3-623-151', name: 'Bajram Curri' },
              { id: '3-623-215', name: 'Krumë' },
              { id: '3-623-217', name: 'Kukës' },
              { id: '3-623-247', name: 'Rrethi i Hasit' },
              { id: '3-623-251', name: 'Rrethi i Kukësit' }
            ]
          },
          { id: '3-622', name: 'Kurbin District', cities: [] },
          {
            id: '3-609',
            name: 'Lezhë County',
            cities: [
              { id: '3-609-169', name: 'Bashkia Kurbin' },
              { id: '3-609-171', name: 'Bashkia Lezhë' },
              { id: '3-609-178', name: 'Bashkia Mirditë' },
              { id: '3-609-218', name: 'Kurbnesh' },
              { id: '3-609-222', name: 'Laç' },
              { id: '3-609-224', name: 'Lezhë' },
              { id: '3-609-229', name: 'Mamurras' },
              { id: '3-609-232', name: 'Milot' },
              { id: '3-609-261', name: 'Rrëshen' },
              { id: '3-609-252', name: 'Rrethi i Kurbinit' },
              { id: '3-609-262', name: 'Rubik' },
              { id: '3-609-267', name: 'Shëngjin' }
            ]
          },
          { id: '3-595', name: 'Lezhë District', cities: [] },
          { id: '3-596', name: 'Librazhd District', cities: [] },
          { id: '3-599', name: 'Lushnjë District', cities: [] },
          { id: '3-602', name: 'Malësi e Madhe District', cities: [] },
          { id: '3-637', name: 'Mallakastër District', cities: [] },
          { id: '3-635', name: 'Mat District', cities: [] },
          { id: '3-638', name: 'Mirditë District', cities: [] },
          { id: '3-619', name: 'Peqin District', cities: [] },
          { id: '3-625', name: 'Përmet District', cities: [] },
          { id: '3-606', name: 'Pogradec District', cities: [] },
          { id: '3-620', name: 'Pukë District', cities: [] },
          { id: '3-624', name: 'Sarandë District', cities: [] },
          { id: '3-611', name: 'Shkodër County', cities: [] },
          {
            id: '3-626',
            name: 'Shkodër District',
            cities: [
              { id: '3-626-175', name: 'Bashkia Malësi e Madhe' },
              { id: '3-626-181', name: 'Bashkia Pukë' },
              { id: '3-626-188', name: 'Bashkia Vau i Dejës' },
              { id: '3-626-202', name: 'Fushë-Arrëz' },
              { id: '3-626-211', name: 'Koplik' },
              { id: '3-626-239', name: 'Pukë' },
              { id: '3-626-255', name: 'Rrethi i Malësia e Madhe' },
              { id: '3-626-257', name: 'Rrethi i Shkodrës' },
              { id: '3-626-266', name: 'Shkodër' },
              { id: '3-626-274', name: 'Vau i Dejës' },
              { id: '3-626-279', name: 'Vukatanë' }
            ]
          },
          { id: '3-593', name: 'Skrapar District', cities: [] },
          { id: '3-616', name: 'Tepelenë District', cities: [] },
          { id: '3-615', name: 'Tirana County', cities: [] },
          {
            id: '3-633',
            name: 'Tirana District',
            cities: [
              { id: '3-633-163', name: 'Bashkia Kavajë' },
              { id: '3-633-190', name: 'Bashkia Vorë' },
              { id: '3-633-207', name: 'Kamëz' },
              { id: '3-633-208', name: 'Kavajë' },
              { id: '3-633-213', name: 'Krrabë' },
              { id: '3-633-248', name: 'Rrethi i Kavajës' },
              { id: '3-633-259', name: 'Rrethi i Tiranës' },
              { id: '3-633-260', name: 'Rrogozhinë' },
              { id: '3-633-268', name: 'Sinaballaj' },
              { id: '3-633-271', name: 'Tirana' },
              { id: '3-633-277', name: 'Vorë' }
            ]
          },
          { id: '3-636', name: 'Tropojë District', cities: [] },
          {
            id: '3-634',
            name: 'Vlorë County',
            cities: [
              { id: '3-634-161', name: 'Bashkia Finiq' },
              { id: '3-634-162', name: 'Bashkia Himarë' },
              { id: '3-634-167', name: 'Bashkia Konispol' },
              { id: '3-634-184', name: 'Bashkia Selenicë' },
              { id: '3-634-189', name: 'Bashkia Vlorë' },
              { id: '3-634-195', name: 'Delvinë' },
              { id: '3-634-206', name: 'Himarë' },
              { id: '3-634-210', name: 'Konispol' },
              { id: '3-634-216', name: 'Ksamil' },
              { id: '3-634-233', name: 'Orikum' },
              { id: '3-634-244', name: 'Rrethi i Delvinës' },
              { id: '3-634-263', name: 'Sarandë' },
              { id: '3-634-264', name: 'Selenicë' },
              { id: '3-634-276', name: 'Vlorë' }
            ]
          },
          { id: '3-613', name: 'Vlorë District', cities: [] }
        ]
      }
    ]
  }
];

class Node {
  constructor(value) {
    this.value = value;
  }

  getParent() {
    const parent = (() => {
      if ('states' in this.value) {
        return null;
      } else if ('cities' in this.value) {
        return (
          sampleData.find(({ states }) =>
            states.some(({ id }) => id === this.value.id)
          ) || null
        );
      } else {
        for (const { states } of sampleData) {
          const state = states.find(({ cities }) =>
            cities.some(({ id }) => id === this.value.id)
          );
          if (state) {
            return state;
          }
        }
        return null;
      }
    })();
    return parent ? new Node(parent) : parent;
  }

  getChildren() {
    if ('states' in this.value) {
      return this.value.states.map((state) => new Node(state));
    } else if ('cities' in this.value) {
      return this.value.cities.map((city) => new Node(city));
    } else {
      return null;
    }
  }

  isBranch() {
    return 'states' in this.value || 'cities' in this.value;
  }

  isEqual(to) {
    return to.value.id === this.value.id;
  }

  toString() {
    return this.value.name;
  }
}

const syncOrAsync = function(value, returnAsync) {
  if (returnAsync) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(value), Math.random() * 500)
    );
  }
  return value;
};
const Sample = () => {
  const [runAsync, setRynAsync] = useState(false);
  const [branch, setBranch] = useState(null);
  const [value, setValue] = useState([]);
  return (
    <div style={{ width: 450 }}>
      <TreeSelect
        sx={{ m: 1 }}
        branch={branch}
        onBranchChange={(_, branch) => void setBranch(branch)}
        // Allow adding cities.
        freeSolo={
          (branch === null || branch === void 0 ? void 0 : branch.value) &&
          'cities' in branch.value
        }
        addFreeSoloText='Add City: '
        getChildren={(node) =>
          syncOrAsync(
            node
              ? node.getChildren()
              : sampleData.map((country) => new Node(country)),
            runAsync
          )
        }
        getParent={(node) => syncOrAsync(node.getParent(), runAsync)}
        getOptionDisabled={(option) => {
          var _a;
          return (
            option.isBranch() &&
            !((_a = option.getChildren()) === null || _a === void 0
              ? void 0
              : _a.length)
          );
        }}
        isBranch={(node) => syncOrAsync(node.isBranch(), runAsync)}
        isOptionEqualToValue={(option, value) => {
          return option instanceof FreeSoloNode
            ? value instanceof FreeSoloNode &&
            value.toString() === option.toString() &&
            (option.parent === null || value.parent === null
              ? option.parent === value.parent
              : option.parent.isEqual(value.parent))
            : value instanceof FreeSoloNode
              ? false
              : option.isEqual(value);
        }}
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            label='Filter'
            helperText='Select multiple cities by their country and state.'
          />
        )}
        renderOption={(...args) => (
          <DefaultOption
            {...((props, node) => {
              var _a, _b;
              return {
                ...props,
                ListItemTextProps: {
                  ...props.ListItemTextProps,
                  secondary:
                    node instanceof FreeSoloNode
                      ? undefined
                      : 'states' in node.value
                        ? `States ${
                          ((_a = node.getChildren()) === null || _a === void 0
                            ? void 0
                            : _a.length) || 0
                        }`
                        : 'cities' in node.value
                          ? `Cities ${
                            ((_b = node.getChildren()) === null || _b === void 0
                              ? void 0
                              : _b.length) || 0
                          }`
                          : undefined
                }
              };
            })(getDefaultOptionProps(...args), args[1])}
          />
        )}
        value={value}
        onChange={(_, value) => void setValue(value)}
      />
    </div>
  );
};

export default Sample;