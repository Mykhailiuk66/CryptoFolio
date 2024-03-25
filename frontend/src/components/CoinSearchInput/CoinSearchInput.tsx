import { Input } from "@nextui-org/react"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import DataContext from "../../store/DataContext"
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { CustomCoinExchangeType } from "../../types";
import CoinModalContext from "../../store/CoinModalContext";


const CoinSearchInput = () => {
  const { coins, exchanges } = useContext(DataContext)
  const [coinExchange, setCoinExchange] = useState<CustomCoinExchangeType[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const { openCoinInfoModal } = useContext(CoinModalContext)
  const autocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchText.length > 0) {
      const filteredCoins = coins.filter((c) => c.short_name.toLowerCase().includes(searchText.toLowerCase()))
      setCoinExchange(filteredCoins.flatMap((c) => {
        return exchanges.map((e) => {
          return {
            ...c,
            key: c.slug + e.slug,
            exchage_name: e.name,
            exchage_slug: e.slug,
            exchage_id: e.id,
          }
        })
      }))
    } else {
      setCoinExchange([])
    }
  }, [coins, exchanges, searchText])

  const autocompleteItems = useMemo(() => {
    return coinExchange.map((ce) => (
      <AutocompleteItem
        key={ce.key}
        textValue={ce.short_name}
        onPress={() => {
          openCoinInfoModal(ce.exchage_slug, ce.short_name)
          setSearchText("")
        }}>
        <div className="flex w-full justify-between items-end">
          <span className="font-bold">
            {ce.short_name}
          </span>
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            {ce.exchage_name}
          </Chip>
        </div>
      </AutocompleteItem>
    ))
  }, [coinExchange, openCoinInfoModal])


  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  }, [coinExchange.length]);

  return (
    <>
      {coinExchange.length > 0 && <Autocomplete
        ref={autocompleteRef}
        menuTrigger="focus"
        variant="flat"
        placeholder="Type to search..."
        classNames={{
          base: "max-w-full sm:max-w-[20rem] h-10 hidden md:block",
        }}
        aria-label="coin-search"
        startContent={<FaSearch color="success" size={20} />}
        allowsCustomValue
        inputValue={searchText}
        onInputChange={setSearchText}
      >
        {autocompleteItems}
      </Autocomplete>
      }
      {coinExchange.length === 0 && (
        <Input
          variant="flat"
          placeholder="Type to search..."
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10 hidden md:block",
          }}
          aria-label="coin-search"
          startContent={<FaSearch color="success" size={20} />}
          value={searchText}
          onValueChange={setSearchText}
        />
      )}
    </>
  )
}


export default CoinSearchInput