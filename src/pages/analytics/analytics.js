import './analytics.css';
import DataStorage from '../../js/modules/DataStorage.js';
import AnalyticsHandler from '../../js/components/AnalyticsHandler.js';
import Statistics from '../../js/components/Statistics.js';
import {DAYS_AGO_NUMBER, HUNDRED_PERCENT} from '../../js/constants/constants.js';

const requestField = document.querySelector('.statistics__title');
const totalNewsNumber = document.querySelector('.statistics__bold_total');
const mentionsNewsNumber = document.querySelector('.statistics__bold_mentions');
const diagramMonth = document.querySelector('.diagram__month');
const rowsContainer = document.querySelector('.diagram__rows-container');

const dataStorage = new DataStorage();

const analyticsHandler = new AnalyticsHandler(
  dataStorage,
  requestField,
  totalNewsNumber,
  mentionsNewsNumber,
  diagramMonth,
  HUNDRED_PERCENT
);
analyticsHandler.showAnalytics();
analyticsHandler.showMonth();

const createDiagramRow = (date, number) => new Statistics(dataStorage);

const statistics = new Statistics(dataStorage);

const datesArr = analyticsHandler.showDates();
const groupedArticles = analyticsHandler.countPercentageOfMentions();

// Рисует диаграмму
function render() {
  for (let i = 0; i < DAYS_AGO_NUMBER; i++) {
    for (let j = 0; j < groupedArticles.length; j++) {

      if ((datesArr[i] === groupedArticles[j].publishedAt) && (groupedArticles[j].mentions !== 0)) {
        let diagramRowElem = createDiagramRow(datesArr[i], groupedArticles[j].percentageOfMentions);
        let diagramRow = diagramRowElem.createDiagramRow(datesArr[i], groupedArticles[j].percentageOfMentions);
        rowsContainer.appendChild(diagramRow);
      }
    }
  }
}

render();
