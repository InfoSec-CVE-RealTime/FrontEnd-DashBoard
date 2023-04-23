import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Nav, NavTitle} from '../NavbarElements';
import {LoadingSpinner} from "../Components";
import axios from "axios";

function Clustering(props) {
  const text = props.is_vendors ? "Vendors" : "Products";
  const get_items_url = props.is_vendors ? "/api/v1.0/get_vendors" : "/api/v1.0/get_products";
  const get_data_url = props.is_vendors ? "/api/v1.0/vendor_history" : "/api/v1.0/product_history";

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState("");
  const [loading, setLoading] = useState(true);

  let [value, setValue] = useState('one');
  const optionsOne = [
    {label: 'All Time', value: 'all'},
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search.length > 0) {
      let items = searchItems(search);
      setItems(items);
    }
  }, [search]);

  const searchItems = (val) => {
    let words = val.split(" ");
    let rankedItems = [];
    availableItems.forEach((item) => {
      let rank = 0;
      let item_name = item.toLowerCase();
      words.forEach((word) => {
        let index = item_name.indexOf(word.toLowerCase());
        if (index > -1) {
          rank += 1 + index;
        }
      });
      if (rank > 0) {
        rankedItems.push({item: item, rank: rank});
      }
    });
    rankedItems.sort((a, b) => {
      return a.rank - b.rank;
    });
    return rankedItems.slice(0, 100).map((item) => {
      return {item: item.item, label: prettify(item.item)};
    });
  }

  const prettify = (item) => {
    item = item.replace(/\\/g, "");
    let words = item.split("_");
    let prettified = "";
    words.forEach((word) => {
      prettified += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return prettified;
  }

  const get_highlighted_item = (item, search) => {
    // return the item, but with the search terms bolded
    let words = search.split(" ");
    let item_name = item.toLowerCase();
    words.forEach((word) => {
      let index = item_name.indexOf(word.toLowerCase());
      if (index > -1) {
        item = item.substring(0, index) + "<b>" + item.substring(index, index + word.length) + "</b>" + item.substring(index + word.length);
      }
    });
    return <span dangerouslySetInnerHTML={{__html: item}}></span>;
  }

  const select_item = (item) => {
    setSelectedItems(prevState => [...prevState, item]);
  }

  const deselect_item = (item) => {
    setSelectedItems(prevState => prevState.filter((i) => i !== item));
  }

  useEffect(() => {
    let t = setTimeout(() => {
      axios.get(window.host + get_items_url).then((response) => {
        if (response.status === 200) {
          setAvailableItems(response.data);
          setLoading(false);
        }
      });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading ? <LoadingSpinner/> : (
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="text-selected d-flex flex-column justify-content-end">Search {text}</h2>

            <select className="dropdown" value={value} onChange={handleChange}>
              {optionsOne.map((optionOne) => (
                <option value={optionOne.value}>{optionOne.label}</option>
              ))}
            </select>
          </div>

          <Row>
            <Col xs={4}>
              <input className="search-input mt-2" placeholder="Search" onChange={handleSearch}></input>
              {search && (
                <div className="content-box search-results mt-2">
                  {items.map((item) => (
                    <div className="search-result" onClick={() => select_item(item)}>{get_highlighted_item(item.label, search)}</div>
                  ))}
                </div>
              )}
              <Nav className="mt-2 pb-2">
                <NavTitle>Selected {text}</NavTitle>
                {selectedItems.length === 0 ? (
                  <div className="text-center mt-2 text-muted">No items selected</div>
                  ) : (
                  <div className="mt-2">
                    {selectedItems.map((item) => (
                      <div className="search-result" onClick={() => deselect_item(item)}>{item.label}</div>
                    ))}
                  </div>
                  )
                }
              </Nav>
            </Col>
            <Col xs={8}>
              <div className="content-box mt-2 pt-4">

              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Clustering;
