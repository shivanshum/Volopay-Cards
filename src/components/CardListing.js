import React, { useEffect, useMemo, useReducer, useCallback } from 'react';
import '../components/CardListing.css';

const initialState = {
  cards: [],
  activeTab: 'Your',
  page: 1,
  searchTerm: '',
  selectedType: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: [...state.cards, ...action.payload] };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_PAGE':
      return { ...state, page: state.page + 1 };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload };
    default:
      return state;
  }
};

const CardListing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cards, activeTab, page, searchTerm, selectedType } = state;

  // Mock API function to fetch cards
  const fetchCards = useCallback(async (page) => {
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mocked data from cards.json
      const data = {
        data: [
          {
            name: 'LinkedIn',
            budget_name: 'Marketing Ads',
            owner_id: 1,
            spent: {
              value: 100,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 900,
              currency: 'SGD',
            },
            card_type: 'burner',
            expiry: '9 Feb',
            limit: 100,
            status: 'active',
          },
          {
            name: 'Google Ads',
            budget_name: 'Marketing Ads',
            owner_id: 1,
            spent: {
              value: 250,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 750,
              currency: 'SGD',
            },
            card_type: 'burner',
            expiry: '12 Mar',
            limit: 200,
            status: 'active',
          },
          {
            name: 'Facebook Ads',
            budget_name: 'Marketing Ads',
            owner_id: 1,
            spent: {
              value: 500,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 500,
              currency: 'SGD',
            },
            card_type: 'burner',
            expiry: '15 Apr',
            limit: 300,
            status: 'active',
          },
          {
            name: 'Quickbooks',
            budget_name: 'Software subscription',
            owner_id: 2,
            spent: {
              value: 50,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 250,
              currency: 'SGD',
            },
            card_type: 'subscription',
            limit: 10,
            status: 'active',
          },
          {
            name: 'Adobe Creative Cloud',
            budget_name: 'Software subscription',
            owner_id: 2,
            spent: {
              value: 200,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 100,
              currency: 'SGD',
            },
            card_type: 'subscription',
            limit: 50,
            status: 'active',
          },
          {
            name: 'Microsoft 365',
            budget_name: 'Software subscription',
            owner_id: 2,
            spent: {
              value: 100,
              currency: 'SGD',
            },
            available_to_spend: {
              value: 150,
              currency: 'SGD',
            },
            card_type: 'subscription',
            limit: 30,
            status: 'active',
          },
        ],
        page: 1,
        per_page: 10,
        total: 100,
      };

      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  const fetchData = useCallback(async () => {
    const data = await fetchCards(page);
    dispatch({ type: 'SET_CARDS', payload: data });
  }, [fetchCards, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabClick = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const handleScroll = useCallback(() => {
    const isAtBottom =
      window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight;

    if (isAtBottom) {
      dispatch({ type: 'SET_PAGE' });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleSearch = (event) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
  };

  const handleFilter = (event) => {
    dispatch({ type: 'SET_SELECTED_TYPE', payload: event.target.value });
  };

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const isCardNameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isTabMatch = activeTab === 'All' || card.status === activeTab;
      const isOwnerMatch = activeTab === 'Your' ? card.owner_id === 1 : true;

      let isCardTypeMatch = true;
      if (selectedType === 'burner') {
        isCardTypeMatch = card.card_type === 'burner';
      } else if (selectedType === 'subscription') {
        isCardTypeMatch = card.card_type === 'subscription';
      }

      return isCardNameMatch && isCardTypeMatch && isTabMatch && isOwnerMatch;
    });
  }, [cards, activeTab, searchTerm, selectedType]);
 
  return (
    <div className="card-listing">
      {/* Tab navigation */}
      <div className="tab-navigation">
        <button className={activeTab === 'Your' ? 'active' : ''} onClick={() => handleTabClick('Your')}>
          Your Cards
        </button>
        <button className={activeTab === 'All' ? 'active' : ''} onClick={() => handleTabClick('All')}>
          All Cards
        </button>
        <button className={activeTab === 'Blocked' ? 'active' : ''} onClick={() => handleTabClick('Blocked')}>
          Blocked Cards
        </button>
      </div>

      {/* Search and filter */}
      <div className="search-filter">
        <input type="text" placeholder="Search by card name..." value={searchTerm} onChange={handleSearch} />
        <select value={selectedType} onChange={handleFilter}>
          <option value="">All Types</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>

      {/* Card list */}
      <div className="card-list">
        {filteredCards.map((card, index) => (
          <div key={index} className={`card ${card.card_type}`}>
            <div className="card-name">{card.name}</div>
            <div className="card-details">
              <div className="budget-name">Budget: {card.budget_name}</div>
              <div className="spent">Spent: {card.spent.value} {card.spent.currency}</div>
              <div className="available-to-spend">Available: {card.available_to_spend.value} {card.available_to_spend.currency}</div>
              {card.expiry && <div className="expiry">Expiry: {card.expiry}</div>}
              {card.limit && <div className="limit">Limit: {card.limit}</div>}
            </div>
            <div className="card-status">Status: {card.status}</div>
          </div>
        ))}
      </div>

      {cards.length < 100 && <div className="load-more">Loading...</div>}
    </div>
  );
};

export default CardListing;